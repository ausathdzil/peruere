import type { Metadata } from 'next';
import { M_PLUS_1 } from 'next/font/google';

import { cn } from '@/lib/utils';
import './globals.css';

const mPlusOne = M_PLUS_1({
  variable: '--font-m-plus-one',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Peruere',
  description: 'A new world to share your thoughts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(mPlusOne.variable, 'font-sans dark:antialiased')}>
        {children}
      </body>
    </html>
  );
}
