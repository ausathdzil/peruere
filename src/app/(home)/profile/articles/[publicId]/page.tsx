import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ArticleEditor } from '@/app/(home)/_components/article-editor';
import { getArtcileByPublicId } from '@/app/(home)/_lib/data';
import { Spinner } from '@/components/ui/spinner';

export async function generateMetadata({
  params,
}: PageProps<'/profile/articles/[publicId]'>): Promise<Metadata> {
  const { publicId } = await params;
  const { article, error } = await getArtcileByPublicId(publicId);

  if (error?.status === 404 || !article) {
    return {};
  }

  return {
    title: article.title || 'Untitled Draft',
    description: article.excerpt,
  };
}

export default function EditArticlePage({
  params,
}: PageProps<'/profile/articles/[publicId]'>) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="grid flex-1">
        <Suspense fallback={<Spinner className="place-self-center" />}>
          <Article params={params} />
        </Suspense>
      </main>
    </div>
  );
}

async function Article({ params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;
  const { article, error } = await getArtcileByPublicId(publicId);

  if (error?.status === 404 || !article) {
    notFound();
  }

  return (
    <ArticleEditor
      currentContent={article.content}
      currentTitle={article.title}
      publicId={publicId}
    />
  );
}
