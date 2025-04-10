// src/app/api/scan/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    return NextResponse.json({ result: response.data });
  } catch (error: any) {
    console.error("Scan error:", error?.response?.data || error);
    return NextResponse.json({ error: "Failed to scan input." }, { status: 500 });
  }
}
