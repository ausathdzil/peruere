import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/user-button';

export default function PublicLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
    </div>
  );
}

function Header() {
  return (
    <header className="border-b p-4">
      <nav className="mx-auto flex max-w-6xl items-center">
        <Button asChild size="sm" variant="ghost">
          <Link href="/">Peruere</Link>
        </Button>
        <UserButton className="ml-auto" />
      </nav>
    </header>
  );
}
