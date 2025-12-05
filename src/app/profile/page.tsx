import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { Suspense } from 'react';

import { SignOutButton } from '@/app/profile/sign-out-button';
import { Lead } from '@/components/typography';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Profile',
};

export default function ProfilePage() {
  return (
    <main className="grid min-h-screen place-items-center">
      <Suspense fallback={null}>
        <ProfileInfo />
      </Suspense>
      <SignOutButton />
    </main>
  );
}

async function ProfileInfo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    unauthorized();
  }

  return <Lead>Hello, {session.user.name}</Lead>;
}
