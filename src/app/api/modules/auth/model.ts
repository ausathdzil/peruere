import { t } from 'elysia';

export namespace AuthModel {
  export const signInBody = t.Object({
    email: t.String(),
    password: t.String(),
  });

  export type signInBody = typeof signInBody.static;

  export const signInResponse = t.Object({
    email: t.String(),
    password: t.String(),
  });

  export type signInResponse = typeof signInResponse.static;

  export const signUpBody = t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String(),
    confirmPassword: t.String(),
  });

  export type signUpBody = typeof signUpBody.static;

  export const signUpResponse = t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String(),
    confirmPassword: t.String(),
  });

  export type signUpResponse = typeof signUpResponse.static;
}
