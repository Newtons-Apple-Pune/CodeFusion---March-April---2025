import { analyzeLogContent } from "@/lib/analyzeLog";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("logFile") as File;

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadPath = path.join(process.cwd(), "public", "uploads", file.name);
  await writeFile(uploadPath, buffer);

  return NextResponse.json({ message: "File uploaded and saved successfully!" });
}
