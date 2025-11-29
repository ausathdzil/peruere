'use client';

import type { VariantProps } from 'class-variance-authority';
import type { Route } from 'next';
import Link from 'next/link';

import { useSession } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Lead } from './typography';
import { Button, type buttonVariants } from './ui/button';
import { Skeleton } from './ui/skeleton';

type NavItem<T extends string = string> = {
  href: T;
  label: string;
} & VariantProps<typeof buttonVariants>;

const navItems: NavItem<Route>[] = [
  {
    href: '/sign-in',
    label: 'Sign In',
    variant: 'secondary',
  },
  {
    href: '/sign-up',
    label: 'Get Started',
    variant: 'default',
  },
];

export function UserButton({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { data, isPending } = useSession();

  if (isPending) {
    return (
      <div className={className} {...props}>
        <Skeleton className="h-8 w-[200px] rounded-full" />
      </div>
    );
  }

  return (
    <div className={cn('space-x-2', className)} {...props}>
      {data?.user ? (
        <Lead>Hey 👋, {data.user.name}!</Lead>
      ) : (
        navItems.map((item) => (
          <Button asChild key={item.href} size="pill-sm" variant={item.variant}>
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))
      )}
    </div>
  );
}
