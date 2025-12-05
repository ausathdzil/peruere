import { eq, ilike } from 'drizzle-orm';
import { NotFoundError } from 'elysia';

import { db } from '@/db';
import { articles, user } from '@/db/schema';
import { slugify } from '@/lib/utils';
import type { ArticleModel } from './model';

export abstract class Article {
  static async createArticle(
    { title, content, status, coverImage }: ArticleModel.CreateArticleBody,
    userId: string,
  ) {
    const [author] = await db.select().from(user).where(eq(user.id, userId));

    if (!author) {
      throw new NotFoundError('Author not found');
    }

    const [article] = await db
      .insert(articles)
      .values({
        title: title.trim(),
        slug: await Article.generateArticleSlug(title),
        content: title.trim(),
        excerpt: content.substring(0, 255),
        status,
        coverImage,
        authorId: userId,
      })
      .returning({
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

    return article satisfies ArticleModel.ArticleResponse;
  }

  static async getArticles() {
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
      })
      .from(articles)) satisfies Array<ArticleModel.ArticleResponse>;
  }

  static async getArticleBySlug(slug: string) {
    const [article] = await db
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
      })
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);

    if (!article) {
      throw new NotFoundError('Article not found');
    }

    return article satisfies ArticleModel.ArticleResponse;
  }

  static async getArticleByPublicId(publicId: string) {
    const [article] = await db
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
        authorId: articles.authorId,
      })
      .from(articles)
      .where(eq(articles.publicId, publicId))
      .limit(1);

    if (!article) {
      throw new NotFoundError('Article not found');
    }

    return article satisfies ArticleModel.ArticleResponse;
  }

  static async updateArticle(
    publicId: string,
    {
      title,
      content,
      status: articleStatus,
      coverImage,
    }: ArticleModel.UpdateArticleBody,
  ) {
    const article = await Article.getArticleByPublicId(publicId);

    const payload: Partial<ArticleModel.UpdateArticleBody> = {};

    const trimmedTitle = title?.trim();

    if (trimmedTitle && trimmedTitle !== article.title) {
      payload.title = trimmedTitle;
      payload.slug = await Article.generateArticleSlug(trimmedTitle);
    }

    const trimmedContent = content?.trim();

    if (trimmedContent && trimmedContent !== article.content) {
      payload.content = trimmedContent;
      payload.excerpt = trimmedContent.substring(0, 255);
    }

    if (articleStatus !== undefined) {
      payload.status === articleStatus;
    }

    if (coverImage !== undefined) {
      payload.coverImage === coverImage;
    }

    const [updatedData] = await db
      .update(articles)
      .set({ ...payload })
      .where(eq(articles.publicId, publicId))
      .returning({
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

    return updatedData satisfies ArticleModel.ArticleResponse;
  }

  static async generateArticleSlug(title: string) {
    const base = slugify(title);

    const rows = await db
      .select({ slug: articles.slug })
      .from(articles)
      .where(ilike(articles.slug, `${base}%`));

    const existing = rows.map((r) => r.slug);

    if (!existing.includes(base)) {
      return base;
    }

    let i = 2;
    let candidate = `${base}-${i}`;

    while (existing.includes(candidate)) {
      i++;
      candidate = `${base}-${i}`;
    }

    return candidate;
  }
}
