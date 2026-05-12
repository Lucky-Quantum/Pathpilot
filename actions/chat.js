"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = "deepseek/deepseek-chat";

async function callOpenRouter(messages) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://pathpilot-bbsf.vercel.app",
      "X-Title": "PathPilot",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages,
      max_tokens: 800,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `OpenRouter API error: ${response.statusText}`);
  }

  return data.choices[0].message.content;
}

export async function sendChatMessage(messages) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Fetch user profile for personalization
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      name: true,
      industry: true,
      skills: true,
      experience: true,
      bio: true,
    },
  });

  const systemPrompt = `You are an expert AI Career Coach for PathPilot, a career development platform. You provide personalized, actionable career advice.

${user ? `User Profile:
- Name: ${user.name || "User"}
- Industry: ${user.industry || "Not specified"}
- Skills: ${user.skills?.length ? user.skills.join(", ") : "Not specified"}
- Years of Experience: ${user.experience ?? "Not specified"}
- Bio: ${user.bio || "Not specified"}

Always personalize your advice based on this profile. Reference their specific industry, skills, and experience level when relevant.` : "The user hasn't set up their profile yet. Encourage them to complete their profile for personalized advice."}

Guidelines:
- Be concise, warm, and encouraging
- Give specific, actionable advice
- Keep responses under 150 words unless asked for detail
- Use bullet points for lists
- Reference the user's actual skills and industry
- If asked about resume, interviews, or cover letters, guide them to PathPilot's built-in tools`;

  const apiMessages = [
    { role: "system", content: systemPrompt },
    ...messages,
  ];

  try {
    const reply = await callOpenRouter(apiMessages);
    return { success: true, message: reply };
  } catch (error) {
    console.error("Chat error:", error);
    return { success: false, message: "Sorry, I couldn't process that. Please try again." };
  }
}