// pages/api/log-ip.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket?.remoteAddress ||
    'Unknown';

  try {
    await pool.execute(
      'INSERT INTO auth_logs (user_id, ip_address, login_time) VALUES (?, ?, NOW())',
      [session.user.id, ip]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error logging IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
