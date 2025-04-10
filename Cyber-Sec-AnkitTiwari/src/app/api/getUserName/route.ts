// app/api/getUserName/route.ts

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ name: 'Guest' }, { status: 200 });
    }

    return NextResponse.json({ name: session.user.name }, { status: 200 });
  } catch (error) {
    console.error('[getUserName] Error:', error);
    return NextResponse.json({ name: 'Guest' }, { status: 500 });
  }
}
