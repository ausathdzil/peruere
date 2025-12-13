import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import pereure from '../../../public/peruere.png';

export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Button
            className="gap-2"
            nativeButton={false}
            render={<Link href="/" />}
            size="sm"
            variant="ghost"
          >
            <Image
              alt="Peruere"
              className="dark:invert"
              height={12}
              src={pereure}
              width={12}
            />
            Peruere
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
