import { elysia } from '@/lib/eden';

export async function getArticles(q?: string) {
  const { data: articles } = await elysia.articles.get({
    query: { q },
    fetch: {
      cache: 'force-cache',
      next: {
        revalidate: 900,
        tags: q ? ['articles', `${q}`] : ['articles'],
      },
    },
  });

  return { articles };
}
