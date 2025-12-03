import { t } from 'elysia';
import { db } from '@/db/models';

export namespace AuthorModel {
  const { user: authors } = db.select;

  export const authorResponse = t.Object({
    name: authors.name,
    image: authors.image,
    createdAt: authors.createdAt,
    displayUsername: authors.displayUsername,
  });

  export type AuthorResponse = typeof authorResponse.static;

  export const authorInvalid = t.Object({ message: t.String() });

  export type AuthorInvalid = typeof authorInvalid.static;
}
