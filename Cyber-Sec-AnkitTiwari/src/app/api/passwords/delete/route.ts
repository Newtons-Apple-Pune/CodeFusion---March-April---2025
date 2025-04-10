import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await req.json();

  try {
    const [result] = await pool.query('DELETE FROM stored_passwords WHERE id = ? AND user_id = ?', [
      id,
      session.user.id,
    ]);
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting password:', error);
    return NextResponse.json({ message: 'Error deleting password' }, { status: 500 });
  }
}
