// app/api/image-check/route.ts

import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import sharp from "sharp";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}_${file.name}`;
    const filepath = path.join(process.cwd(), "public", "uploads", filename);

    // Create uploads directory if it doesn't exist
    const fs = require("fs");
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await writeFile(filepath, buffer);

    let isCorrupted = false;

    try {
      await sharp(buffer).metadata(); // Will throw error if image is invalid
    } catch (error) {
      console.error("Sharp failed to process image:", error);
      isCorrupted = true;
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    await prisma.imageCheck.create({
      data: {
        userId: user!.id,
        filename: file.name,
        filepath: `/uploads/${filename}`,
        isCorrupted,
      },
    });

    return NextResponse.json({ valid: !isCorrupted });
  } catch (error) {
    console.error("Image Check Error:", error);
    return NextResponse.json({ error: "Error processing image" }, { status: 500 });
  }
}
