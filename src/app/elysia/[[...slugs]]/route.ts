import openapi from '@elysiajs/openapi';
import Elysia from 'elysia';

import { auth } from '@/lib/auth';
import { OpenAPI } from './auth';

const app = new Elysia({ prefix: '/elysia' })
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    }),
  )
  .mount('/auth', auth.handler)
  .get('/', 'Hello, World!', { tags: ['Root'] });

export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
