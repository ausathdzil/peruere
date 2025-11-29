import Elysia from 'elysia';

import { AuthModel } from './model';
import { Auth } from './service';

export const auth = new Elysia({ prefix: '/auth', tags: ['auth'] })
  .post(
    '/sign-in',
    ({ body }) => {
      const response = Auth.signIn(body);

      return response;
    },
    {
      body: AuthModel.signInBody,
      response: {
        200: AuthModel.signInResponse,
      },
    },
  )
  .post(
    '/sign-up',
    ({ body }) => {
      const response = Auth.signUp(body);

      return response;
    },
    {
      body: AuthModel.signUpBody,
      response: {
        200: AuthModel.signUpResponse,
      },
    },
  );
