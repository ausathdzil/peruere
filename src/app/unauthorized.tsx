import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';

export default function Unauthorized() {
  return (
    <main className="grid min-h-screen place-items-center">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>401 - Unauthorized</EmptyTitle>
          <EmptyDescription>
            Please sign in to access this page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild size="pill">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
