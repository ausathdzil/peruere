import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Text, Title } from '@/components/typography';
import { elysia } from '@/lib/eden';

export async function generateMetadata({
  params,
}: PageProps<'/u/[username]/articles/[publicId]'>): Promise<Metadata> {
  const { publicId } = await params;
  const { data: article, error } = await elysia.articles({ publicId }).get();

  if (error?.status === 404 || !article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function Page({
  params,
}: PageProps<'/u/[username]/articles/[publicId]'>) {
  return (
    <main className="mx-auto max-w-[60ch] p-16">
      <Suspense fallback={null}>
        <ArticleContent params={params} />
      </Suspense>
    </main>
  );
}

type ArticleContentProps = {
  params: Promise<{ publicId: string }>;
};

async function ArticleContent({ params }: ArticleContentProps) {
  const { publicId } = await params;
  const { data: article, error } = await elysia.articles({ publicId }).get();

  if (error?.status === 404 || !article) {
    notFound();
  }

  return (
    <>
      <Title>{article.title}</Title>
      <Text>{article.content}</Text>
    </>
  );
}
