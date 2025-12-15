import { headers } from 'next/headers';

import { elysia } from '@/lib/eden';

export async function getArticles(q?: string) {
  const { data: articles } = await elysia.articles.get({
    query: { q },
    fetch: {
      cache: 'force-cache',
      next: {
        revalidate: 900,
        tags: ['articles'],
      },
    },
  });

  return { articles };
}

export async function getUserArticles(
  status?: 'draft' | 'published' | 'archived' | null | undefined,
  q?: string | undefined,
) {
  const { data: articles, error } = await elysia.me.articles.get({
    headers: await headers(),
    query: { status, q },
    fetch: {
      cache: 'force-cache',
      next: {
        revalidate: 900,
        tags: ['articles'],
      },
    },
  });

  return { articles, error };
}
