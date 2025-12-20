import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { articles, user } from '@/db/schema';
import { auth } from '@/lib/auth';
import { elysia } from '@/lib/eden';

export type TestUser = {
  data: {
    username: string;
    email: string;
    password: string;
  };
  headers: HeadersInit;
};

function generateUniqueId(): string {
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString('hex');
}

export async function createTestUser() {
  const uniqueId = generateUniqueId();

  const userData = {
    name: 'Test User',
    username: `test_${uniqueId}`,
    email: `test_${uniqueId}@example.com`,
    password: 'Test_Password_123!',
  };

  const res = await auth.api.signUpEmail({
    body: userData,
    asResponse: true,
  });

  return {
    data: userData,
    headers: {
      cookie: res.headers.getSetCookie().join('; '),
    },
  };
}

export async function createTestArticle(headers: HeadersInit) {
  const { data } = await elysia.articles.post(
    {
      title: 'Test article',
      content: 'Test content',
      status: 'published',
    },
    { headers },
  );

  return data;
}

export async function cleanupTestUser(username: string) {
  await db.delete(user).where(eq(user.username, username));
}

export async function cleanupTestArticle(publicId: string) {
  await db.delete(articles).where(eq(articles.publicId, publicId));
}
