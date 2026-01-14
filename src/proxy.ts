import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse, type ProxyConfig } from 'next/server';

const protectedRoutes = ['/profile'];
const authRoutes = ['/sign-in', '/sign-up'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  const sessionCookie = getSessionCookie(req);

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  if (isAuthRoute && sessionCookie && !path.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/profile', req.nextUrl));
  }

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: ['/((?!api|elysia|_next/static|_next/image|.*\\.png$).*)'],
};
