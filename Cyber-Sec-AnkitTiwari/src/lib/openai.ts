import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeThreat(input: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You're a cybersecurity assistant. Analyze the following input for potential threats, risks, and suggest mitigation strategies.",
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  return response.choices[0]?.message?.content;
}
