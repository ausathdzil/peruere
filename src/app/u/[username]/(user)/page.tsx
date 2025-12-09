import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Empty, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import { getArticles, getAuthor } from './_lib/data';

export default function UserPage({ params }: PageProps<'/u/[username]'>) {
  return (
    <Suspense fallback={<ArticlesSkeleton />}>
      <Articles params={params} />
    </Suspense>
  );
}

async function Articles({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { author, authorError } = await getAuthor(username);

  if (authorError?.status === 404 || !author) {
    notFound();
  }

  const { articles } = await getArticles(username);

  if (!articles || articles.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No articles yet…</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <ItemGroup className="w-full list-none gap-4">
      {articles.map((article) => (
        <li key={article.publicId}>
          <Item asChild>
            <Link href={`/u/${author.username}/articles/${article.publicId}`}>
              <ItemContent>
                <ItemTitle>{article.title}</ItemTitle>
                <ItemDescription>{article.excerpt}</ItemDescription>
              </ItemContent>
            </Link>
          </Item>
        </li>
      ))}
    </ItemGroup>
  );
}

function ArticlesSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 px-4">
      <Skeleton className="h-[77.85px] w-full" />
      <Skeleton className="h-[77.85px] w-full" />
      <Skeleton className="h-[77.85px] w-full" />
      <Skeleton className="h-[77.85px] w-full" />
      <Skeleton className="h-[77.85px] w-full" />
    </div>
  );
}
