import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      ImageChecks: true,
    },
  });

  if (!user) return NextResponse.json([]);

  return NextResponse.json(
    user.ImageChecks.map(img => ({
      id: img.id,
      filename: img.filename,
      uploadedAt: img.uploadedAt,
      status: img.isCorrupted? "Corrupted": "Not Corrupted",
    }))
  );
}
