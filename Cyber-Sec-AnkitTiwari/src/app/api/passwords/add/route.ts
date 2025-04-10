// app/api/passwords/add/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import pool  from '@/lib/db'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { platform, username, password } = await req.json()

    if (!platform || !username || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await pool.query(
      'INSERT INTO stored_passwords (user_id, platform, username, password) VALUES (?, ?, ?, ?)',
      [session.user.id, platform, username, password]
    )

    return NextResponse.json({ message: 'Password added successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error adding password:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
