import { Elysia } from 'elysia';

import { auth as betterAuth } from '@/lib/auth';

export const auth = new Elysia({ prefix: '/auth', name: 'better-auth' })
  .mount(betterAuth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await betterAuth.api.getSession({
          headers,
        });

        if (!session) {
          return status(401, {
            message: 'You are unauthorized to access this resource',
          });
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });
