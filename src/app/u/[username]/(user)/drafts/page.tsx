import { formatDate } from 'date-fns';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
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
import { getAuthor, getDrafts } from '../_lib/data';

export default function UserDraftsPage({
  params,
}: PageProps<'/u/[username]/drafts'>) {
  return (
    <Suspense fallback={<UserDraftsSkeleton />}>
      <UserDrafts params={params} />
    </Suspense>
  );
}

async function UserDrafts({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { author, authorError } = await getAuthor(username);

  if (authorError?.status === 404 || !author) {
    notFound();
  }

  const { drafts, draftsError } = await getDrafts(username);

  if (draftsError?.status === 403) {
    redirect(`/u/${author.username}`);
  }

  if (!drafts || drafts.length === 0) {
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
      {drafts.map((draft) => (
        <li key={draft.publicId}>
          <Item asChild>
            <Link
              href={`/u/${author.username}/articles/${draft.publicId}/edit`}
            >
              <ItemContent>
                <ItemTitle>{draft.title || 'Untitled Draft'}</ItemTitle>
                <ItemDescription className="tabular-nums">
                  Last Updated:{' '}
                  {formatDate(draft.updatedAt, 'dd MMM yyyy, HH:mm')}
                </ItemDescription>
              </ItemContent>
            </Link>
          </Item>
        </li>
      ))}
    </ItemGroup>
  );
}

function UserDraftsSkeleton() {
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
