import { treaty } from '@elysiajs/eden';

import type { App } from '@/app/elysia/[[...slugs]]/route';

export const elysia = treaty<App>(process.env.NEXT_PUBLIC_APP_URL!).elysia;
