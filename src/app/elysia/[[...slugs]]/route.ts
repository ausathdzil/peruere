import openapi from '@elysiajs/openapi';
import Elysia from 'elysia';

import { auth } from '@/lib/auth';

const app = new Elysia({ prefix: '/elysia' })
  .use(openapi())
  .mount('/auth', auth.handler)
  .get('/', 'Hello, World!', { tags: ['Root'] });

export type App = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
