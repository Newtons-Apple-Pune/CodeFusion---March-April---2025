// src/app/api/analyze-breach/route.ts
import { NextRequest, NextResponse } from "next/server";
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const prompt = `
You are a JSON API generator.

INPUT:
A cybersecurity breach description is provided. Analyze it strictly and respond ONLY with valid JSON in the following format. Do NOT explain anything.

FORMAT:
\`\`\`json
{
  "rootCause": "....",
  "impact": "....",
  "recommendation": "....",
  "confidence": "High" | "Medium" | "Low"
}
\`\`\`

DESCRIPTION:
${description}

RESPONSE:
`;

    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.1",
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.6,
        top_p: 0.9,
        return_full_text: false,
      },
    });

    const rawOutput = response.generated_text.trim();

    // Debug log
    console.log("🧠 AI RAW OUTPUT:", JSON.stringify(rawOutput));

    // Try to extract JSON code block
    const match = rawOutput.match(/\{[\s\S]*\}/);
    let analysis;

    if (match) {
      try {
        analysis = JSON.parse(match[0]);
      } catch (parseError) {
        console.error("❌ Failed to parse extracted JSON:", match[0]);
        analysis = getFallback("Parsing failed, output malformed.");
      }
    } else {
      console.warn("⚠️ No JSON found in AI response:", rawOutput);
      analysis = getFallback("JSON malformed or not found");
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("🔥 Error in breach analysis:", error);
    return NextResponse.json(
      { error: "Failed to analyze breach" },
      { status: 500 }
    );
  }
}

function getFallback(reason: string) {
  return {
    rootCause: `AI analysis failed: ${reason}`,
    impact: "Unable to determine impact",
    recommendation: "Try rephrasing the breach description or run a manual assessment",
    confidence: "Low",
  };
}
