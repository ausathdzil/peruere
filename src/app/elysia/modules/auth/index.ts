import { Elysia } from 'elysia';

import { auth as betterAuth } from '@/lib/auth';

export class AuthError extends Error {
  status = 401;

  constructor(public message: string) {
    super(message);
  }
}

export const auth = new Elysia({ prefix: '/auth', name: 'better-auth' })
  .mount(betterAuth.handler)
  .macro({
    auth: {
      async resolve({ request: { headers } }) {
        const session = await betterAuth.api.getSession({
          headers,
        });

        if (!session) {
          throw new AuthError('You are unauthorized to access this resource');
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });
