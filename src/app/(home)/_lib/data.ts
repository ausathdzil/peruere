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

export async function getArtcileByPublicId(publicId: string) {
  const { data: article, error } = await elysia.articles({ publicId }).get({
    headers: await headers(),
    fetch: {
      cache: 'force-cache',
      next: {
        tags: [`article-${publicId}`],
      },
    },
  });

  return { article, error };
}
