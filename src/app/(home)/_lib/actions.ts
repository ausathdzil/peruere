'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { elysia } from '@/lib/eden';

export async function createDraft() {
  const { data, error } = await elysia.articles.post(
    {
      title: '',
      content: '',
      status: 'draft',
    },
    { headers: await headers() },
  );

  if (error) {
    return {
      error: {
        status: error.status || 500,
        message:
          error.value?.message || 'An unknown error occurred, please try again',
      },
    };
  }

  if (data.author?.username) {
    revalidateTag('drafts', 'max');
    redirect(`/editor/${data.publicId}`);
  }

  return {
    error: {
      status: 500,
      message: 'Unable to create draft, please try again',
    },
  };
}

export async function deleteArticle(publicId: string, username: string) {
  const { data, error } = await elysia
    .articles({ publicId })
    .delete({}, { headers: await headers() });

  if (error) {
    return {
      error: {
        status: error.status || 500,
        message:
          error.value?.message || 'An unknown error occurred, please try again',
      },
    };
  }

  if (data) {
    revalidateTag('articles', 'max');
    revalidateTag(`articles-${username}`, 'max');
    revalidateTag('drafts', 'max');
    return { message: data.message };
  }

  return {
    error: {
      status: 500,
      message: 'Unable to delete article, please try again',
    },
  };
}
