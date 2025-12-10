'use server';

import { updateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { elysia } from '@/lib/eden';

export async function createDraft() {
  const { data, error } = await elysia.articles.post(
    {
      title: 'Untitled Draft',
      content: '',
      status: 'draft',
      coverImage: null,
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

  if (data?.author?.username) {
    updateTag(`drafts-${data.author.username}`);
    redirect(`/u/${data.author.username}/articles/${data.publicId}/edit`);
  }

  return { error: { status: 500, message: 'Unable to create draft' } };
}
