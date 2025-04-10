
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { analyzeLogContent } from "@/lib/analyzeLog";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

  const fileBytes = await file.arrayBuffer();
  const buffer = Buffer.from(fileBytes);
  const content = buffer.toString("utf-8");

  const report = analyzeLogContent(content); 

  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/\s+/g, "_");
  const filename = `${timestamp}_${sanitizedName}`;
  const uploadPath = path.join(process.cwd(), "uploads", filename);

 
  await writeFile(uploadPath, buffer);

  const reportText = report.join("\n");
  const reportFilename = `${timestamp}_report.txt`;
  const reportPath = path.join(process.cwd(), "uploads", reportFilename);
  await writeFile(reportPath, reportText);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.uploadedLog.create({
    data: {
      userId: user.id,
      filename: file.name,
      filepath: `/uploads/${filename}`,
      findings: reportText,
      reportPath: `/uploads/${reportFilename}`,
    },
  });

  return NextResponse.json({
    message: "Log analyzed",
    report,
    downloadReportUrl: `/uploads/${reportFilename}`,
  });
}
