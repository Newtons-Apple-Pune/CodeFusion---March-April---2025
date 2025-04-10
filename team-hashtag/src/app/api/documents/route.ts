import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 401 });

  const documents = await prisma.document.findMany({
    where: {
      user: { email: session.user.email },
    },
    orderBy: {
      uploadedAt: "desc",
    },
  });

  return NextResponse.json(documents);
}
