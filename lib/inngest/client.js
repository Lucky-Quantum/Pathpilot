import { Inngest } from "inngest";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export const inngest = new Inngest({
  id: "career-coach", // Unique app ID
  name: "Career Coach",
});

async function callOpenRouter(prompt) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://pathpilot.vercel.app",
      "X-Title": "PathPilot",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || `OpenRouter API error: ${response.statusText}`);
  }

  return data.choices[0].message.content;
}

export { callOpenRouter };
