// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // 🚫 Allow access to /sign-in and /api routes
  if (
    pathname.startsWith('/api') ||
    pathname === '/sign-in' ||
    pathname === '/_next' || // Optional for Next.js assets
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // ✅ If no token, redirect to /sign-in with callback to original page
  if (!token) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'], // Apply to all except static files
};
