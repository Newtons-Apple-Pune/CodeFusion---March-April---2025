// app/api/getBreachInsights/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const description = body?.description;

    if (!description) {
      return NextResponse.json({ message: "Description is required" }, { status: 400 });
    }

    const prompt = `Analyze the following cybersecurity breach and provide:\n1. Root Cause\n2. Impact\n3. Recommendation\n\nBreach: ${description}`;

    const hfResponse = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!hfResponse.ok) {
      throw new Error(`Hugging Face API error: ${hfResponse.statusText}`);
    }

    const data = await hfResponse.json();
    const rawText = data?.[0]?.generated_text || "No output";

    const rootCauseMatch = rawText.match(/Root Cause: (.*?)(\n|$)/i);
    const impactMatch = rawText.match(/Impact: (.*?)(\n|$)/i);
    const recommendationMatch = rawText.match(/Recommendation: (.*?)(\n|$)/i);

    const rootCause = rootCauseMatch?.[1]?.trim() || "Not identified";
    const impact = impactMatch?.[1]?.trim() || "Not identified";
    const recommendation = recommendationMatch?.[1]?.trim() || "Not identified";

    return NextResponse.json({
      rootCause,
      impact,
      recommendation,
      rawText,
    });
  } catch (error) {
    console.error("AI error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "AI request failed", error: message }, { status: 500 });
  }
}
