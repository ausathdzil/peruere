import { elysia } from '@/lib/eden';

export async function getArticle(publicId: string) {
  const { data: article, error } = await elysia.articles({ publicId }).get({
    fetch: {
      cache: 'force-cache',
      next: {
        tags: [`article-${publicId}`],
      },
    },
  });

  return { article, error };
}
