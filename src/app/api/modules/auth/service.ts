import type { AuthModel } from './model';

export abstract class Auth {
  static signIn({ email, password }: AuthModel.signInBody) {
    return {
      email,
      password,
    };
  }

  static signUp({
    name,
    email,
    password,
    confirmPassword,
  }: AuthModel.signUpBody) {
    return {
      name,
      email,
      password,
      confirmPassword,
    };
  }
}
