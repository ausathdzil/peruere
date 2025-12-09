import { HouseIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Muted } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/lib/auth';
import { CreateArticleButton } from './_components/create-article-button';
import { SignOutButton } from './_components/sign-out-button';
import { UserNav } from './_components/user-nav';
import { getAuthor } from './_lib/data';

export async function generateMetadata({
  params,
}: PageProps<'/u/[username]'>): Promise<Metadata> {
  const { username } = await params;

  const { author, authorError } = await getAuthor(username);

  if (authorError?.status === 404 || !author) {
    return {};
  }

  return { title: author.name };
}

type UserLayoutProps = LayoutProps<'/u/[username]'> &
  Omit<PageProps<'/u/[username]'>, 'searchParams'>;

export default function UserLayout({ children, params }: UserLayoutProps) {
  return (
    <main className="grid min-h-screen grid-rows-[1fr_auto] gap-4 pt-safe-top">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 p-8">
        <Suspense fallback={<ProfileSkeleton />}>
          <Header params={params} />
        </Suspense>
        {children}
      </section>
      <div className="place-self-center p-8">
        <SignOutButton />
      </div>
    </main>
  );
}

async function Header({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { author, authorError } = await getAuthor(username);

  if (authorError?.status === 404 || !author) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="grid w-full gap-4">
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 pl-4">
        <Muted>@{author.displayUsername}</Muted>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost">
            <Link href="/">
              <HouseIcon />
              Home
            </Link>
          </Button>
          {session?.user.username === author.username && (
            <CreateArticleButton />
          )}
        </div>
      </div>
      <UserNav
        className="place-self-center"
        user={session?.user}
        username={username}
      />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-[164px] rounded-full" />
    </div>
  );
}
