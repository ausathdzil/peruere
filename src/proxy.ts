import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { auth } from './lib/auth';

const authRoutes = ['/sign-in', '/sign-up'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(path);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (isAuthRoute && session?.user.id && !path.startsWith('/u')) {
    return NextResponse.redirect(
      new URL(`/u/${session.user.username}`, req.nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|elysia|_next/static|_next/image|.*\\.png$).*)'],
};
