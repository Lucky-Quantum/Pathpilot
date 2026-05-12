"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = "deepseek/deepseek-chat";

async function callOpenRouter(prompt) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://pathpilot-lake.vercel.app/",
      "X-Title": "PathPilot",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1200,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || `OpenRouter API error: ${response.statusText}`);
  }

  return data.choices[0].message.content;
}

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  let result;
  try {
    result = await callOpenRouter(prompt);
    let text = result.trim();
    
    // Remove markdown code blocks
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Try to parse directly first
    let quiz;
    try {
      quiz = JSON.parse(text);
    } catch {
      // Try to extract JSON object from text - use greedy match with stack-based balancing
      let braceCount = 0;
      let startIndex = -1;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === '{') {
          if (braceCount === 0) startIndex = i;
          braceCount++;
        } else if (text[i] === '}') {
          braceCount--;
          if (braceCount === 0 && startIndex !== -1) {
            try {
              quiz = JSON.parse(text.substring(startIndex, i + 1));
              break;
            } catch {
              continue;
            }
          }
        }
      }
      if (!quiz) {
        throw new Error("No valid JSON found");
      }
    }

    return quiz.questions || [];
  } catch (error) {
    console.error("Error generating quiz:", error);
    console.error("Raw response:", result);
    console.error("Prompt sent:", prompt);
    if (error instanceof SyntaxError) {
      throw new Error(`Unexpected response format from AI. Response: ${result?.substring(0, 200)}... Please try again.`);
    }
    throw new Error("Failed to generate quiz questions: " + error.message);
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  // Get wrong answers
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  // Only generate improvement tips if there are wrong answers
  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await callOpenRouter(improvementPrompt);

      improvementTip = tipResult.trim();
      console.log(improvementTip);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return [];
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return [];
    }

    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    return [];
  }
}
