'use client';

import { CloudAlertIcon } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="en">
      <body className="font-sans dark:antialiased">
        <main className="grid min-h-screen place-items-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CloudAlertIcon />
              </EmptyMedia>
            </EmptyHeader>
            <EmptyContent>
              <EmptyDescription>{error.message}</EmptyDescription>
              <EmptyTitle>{error.digest}</EmptyTitle>
            </EmptyContent>
          </Empty>
        </main>
      </body>
    </html>
  );
}
