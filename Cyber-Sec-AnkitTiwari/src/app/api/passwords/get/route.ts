// app/api/passwords/get/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import pool from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const [rows] = await pool.query(
      'SELECT id, platform, username, password FROM stored_passwords WHERE user_id = ?',
      [session.user.id]
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching passwords:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
