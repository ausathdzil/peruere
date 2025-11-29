import { headers } from 'next/headers';
import { Suspense } from 'react';

import { Lead, Text, Title } from '@/components/typography';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/lib/auth';
import { elysia } from '@/lib/eden';

export default async function Home() {
  return (
    <main className="grid flex-1 p-4">
      <section className="my-16 space-y-4 text-center">
        <Suspense
          fallback={<Skeleton className="h-7 w-24 place-self-center" />}
        >
          <Hello />
        </Suspense>
        <Text>…</Text>
        <Title>A new world to share your thoughts.</Title>
      </section>
    </main>
  );
}

async function Hello() {
  const session = await auth.api.getSession({ headers: await headers() });
  const message = await elysia.get();

  return (
    <Lead>{session?.user ? `Hello, ${session.user.name}` : message.data}</Lead>
  );
}
