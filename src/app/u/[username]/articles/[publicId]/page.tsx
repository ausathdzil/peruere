import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Text, Title } from '@/components/typography';
import { getArticle } from '../_lib/data';

export async function generateMetadata({
  params,
}: PageProps<'/u/[username]/articles/[publicId]'>): Promise<Metadata> {
  const { publicId } = await params;
  const { article, error } = await getArticle(publicId);

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
    <main className="p-16">
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
  const { article, error } = await getArticle(publicId);

  if (error?.status === 404 || !article) {
    notFound();
  }

  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto">
      <Title>{article.title}</Title>
      <Text>{article.content}</Text>
    </article>
  );
}
