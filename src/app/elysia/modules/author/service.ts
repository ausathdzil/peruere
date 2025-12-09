import { and, eq } from 'drizzle-orm';
import { NotFoundError } from 'elysia';

import { db } from '@/db';
import { articles, user } from '@/db/schema';
import type { ArticleModel } from '../article/model';
import type { AuthorModel } from './model';

export abstract class Author {
  static async getAuthors() {
    return (await db
      .select({
        name: user.name,
        image: user.image,
        createdAt: user.createdAt,
        username: user.username,
        displayUsername: user.displayUsername,
      })
      .from(user)) satisfies Array<AuthorModel.AuthorResponse>;
  }

  static async getAuthor(handle: string) {
    const [author] = await db
      .select({
        id: user.id,
        name: user.name,
        image: user.image,
        createdAt: user.createdAt,
        username: user.username,
        displayUsername: user.displayUsername,
      })
      .from(user)
      .where(eq(user.username, handle))
      .limit(1);

    if (!author) {
      throw new NotFoundError('Author not found');
    }

    return author satisfies AuthorModel.AuthorResponse;
  }

  static async getAuthorArticles(handle: string) {
    const author = await Author.getAuthor(handle);

    return (await db
      .select({
        publicId: articles.publicId,
        title: articles.title,
        slug: articles.slug,
        content: articles.content,
        excerpt: articles.excerpt,
        status: articles.status,
        coverImage: articles.coverImage,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        author: {
          name: user.name,
          image: user.image,
          createdAt: user.createdAt,
          username: user.username,
          displayUsername: user.displayUsername,
        },
      })
      .from(articles)
      .leftJoin(user, eq(articles.authorId, user.id))
      .where(
        and(eq(articles.authorId, author.id), eq(articles.status, 'published')),
      )) satisfies Array<ArticleModel.ArticleResponse>;
  }
}
