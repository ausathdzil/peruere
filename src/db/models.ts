import { createInsertSchema, createUpdateSchema } from 'drizzle-typebox';
import { t } from 'elysia';

import { articles, user } from './schema';
import { spreads } from './utils';

export const db = {
  select: spreads({ articles, user }, 'select'),
  insert: spreads(
    {
      createArticle: createInsertSchema(articles, {
        title: t.String({
          minLength: 1,
          maxLength: 255,
          error: 'Title must be between 1 and 255 characters',
        }),
        content: t.String({ minLength: 1, error: 'Content is required' }),
        status: t.UnionEnum(['draft', 'published', 'archived'], {
          error: 'Status must be either draft, published, or archived',
        }),
      }),
    },
    'insert',
  ),
  update: spreads(
    {
      updateArticle: createUpdateSchema(articles, {
        title: t.Optional(
          t.String({
            minLength: 1,
            maxLength: 255,
            error: 'Title must be between 1 and 255 characters',
          }),
        ),
        slug: t.Optional(
          t.String({
            minLength: 1,
            maxLength: 255,
            error: 'Slug must be between 1 and 255 characters',
          }),
        ),
        content: t.Optional(
          t.String({ minLength: 1, error: 'Content is required' }),
        ),
        excerpt: t.Optional(
          t.String({
            minLength: 1,
            maxLength: 255,
            error: 'Excerpt must be between 1 and 255 characters',
          }),
        ),
        status: t.Optional(
          t.UnionEnum(['draft', 'published', 'archived'], {
            error: 'Status must be either draft, published, or archived',
          }),
        ),
      }),
    },
    'update',
  ),
} as const;
