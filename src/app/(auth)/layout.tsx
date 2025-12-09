import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default async function AuthLayout({ children }: LayoutProps<'/'>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(`/u/${session.user.username}`);
  }

  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Button asChild size="sm" variant="ghost">
            <Link href="/">Peruere</Link>
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block" />
    </main>
  );
}
