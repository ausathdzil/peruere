import { t } from 'elysia';

import { db } from '@/db/models';

export namespace ArticleModel {
  const { articles } = db.select;
  const { createArticle } = db.insert;

  export const createArticleBody = t.Object({
    title: createArticle.title,
    content: createArticle.content,
    status: createArticle.status,
    coverImage: createArticle.coverImage,
    authorId: createArticle.authorId,
  });

  export type CreateArticleBody = typeof createArticleBody.static;

  export const articleResponse = t.Object({
    publicId: articles.publicId,
    title: articles.title,
    slug: articles.slug,
    content: articles.content,
    excerpt: articles.excerpt,
    status: articles.status,
    coverImage: articles.coverImage,
    createdAt: articles.createdAt,
    updatedAt: articles.updatedAt,
  });

  export type ArticleResponse = typeof articleResponse.static;

  export const articleInvalid = t.Object({ message: t.String() });

  export type ArticleInvalid = typeof articleInvalid.static;
}
