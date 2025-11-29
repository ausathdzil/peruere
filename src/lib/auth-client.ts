import { createAuthClient } from 'better-auth/react';

export const { useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  basePath: '/elysia/auth/api',
});
