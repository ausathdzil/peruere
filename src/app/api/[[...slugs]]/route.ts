import openapi from '@elysiajs/openapi';
import Elysia from 'elysia';

import { auth } from '../modules/auth';

const app = new Elysia({ prefix: '/api/v1' })
  .use(openapi())
  .use(auth)
  .get('/', 'Hello, World!');

export type app = typeof app;

export const GET = app.handle;
export const POST = app.handle;
