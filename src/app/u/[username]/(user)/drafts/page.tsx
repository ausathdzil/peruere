import { formatDate } from 'date-fns';
import { headers } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

import { SearchInput } from '@/components/search-input';
import { Empty, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/lib/auth';
import { searchParamsCache } from '@/lib/search-params';
import { getAuthor, getDrafts } from '../_lib/data';

export default function UserDraftsPage({
  params,
  searchParams,
}: PageProps<'/u/[username]/drafts'>) {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 p-4">
      <Suspense fallback={<Skeleton className="h-9 w-full" />}>
        <SearchInput placeholder="Search drafts…" />
      </Suspense>
      <Suspense fallback={<UserDraftsSkeleton />}>
        <UserDrafts params={params} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

type UserDraftsProps = {
  params: Promise<{ username: string }>;
  searchParams: Promise<SearchParams>;
};

async function UserDrafts({ params, searchParams }: UserDraftsProps) {
  const { username } = await params;
  const { q } = await searchParamsCache.parse(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { author, authorError } = await getAuthor(username);

  if (authorError?.status === 404 || !author) {
    notFound();
  }

  if (session?.user.username !== author.username) {
    notFound();
  }

  const { drafts } = await getDrafts(q);

  if (!drafts || drafts.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No drafts found…</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <ItemGroup className="w-full list-none gap-4">
      {drafts.map((draft) => (
        <li key={draft.publicId}>
          <Item
            render={
              <Link
                href={`/u/${author.username}/articles/${draft.publicId}/edit`}
              />
            }
          >
            <ItemContent>
              <ItemTitle>{draft.title}</ItemTitle>
              <ItemDescription className="tabular-nums">
                Last Updated:{' '}
                {formatDate(draft.updatedAt, 'dd MMM yyyy, HH:mm')}
              </ItemDescription>
            </ItemContent>
          </Item>
        </li>
      ))}
    </ItemGroup>
  );
}

function UserDraftsSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Skeleton className="h-[77.85px] w-full" />
      <Skeleton className="h-[77.85px] w-full" />
      <Skeleton className="h-[77.85px] w-full" />
      <Skeleton className="h-[77.85px] w-full" />
      <Skeleton className="h-[77.85px] w-full" />
    </div>
  );
}
