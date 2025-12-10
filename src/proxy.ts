import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const authRoutes = ['/sign-in', '/sign-up'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(path);

  const sessionCookie = getSessionCookie(req);

  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|elysia|_next/static|_next/image|.*\\.png$).*)'],
};
