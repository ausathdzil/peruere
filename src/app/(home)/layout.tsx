import Link from 'next/link';

import { Button } from '@/components/ui/button';

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
      <nav className="mx-auto max-w-6xl">
        <Button asChild size="sm" variant="ghost">
          <Link href="/">Peruere</Link>
        </Button>
      </nav>
    </header>
  );
}
