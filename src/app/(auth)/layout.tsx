import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import pereure from '../../../public/peruere.png';

export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Button asChild size="sm" variant="ghost">
            <Link href="/">
              <Image alt="Peruere" height={16} src={pereure} width={16} />
              Peruere
            </Link>
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
