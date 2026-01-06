import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

import { Large } from '@/components/typography';
import { Button } from '@/components/ui/button';

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 bg-background pt-safe-top">
      <div className="relative mx-auto flex w-full max-w-6xl items-center gap-4 p-4">
        <Button
          nativeButton={false}
          render={<Link href="/profile" />}
          size="sm"
          variant="ghost"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
          Back
        </Button>
        <Large className="absolute left-1/2 -translate-x-1/2">{title}</Large>
      </div>
    </header>
  );
}
