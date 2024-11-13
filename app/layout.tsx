import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import Breadcrumb from '@/lib/components/Breadcrumb';

const inter = Inter({ subsets: ['latin'] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'JSON Template Creator',
  description: 'Create template files',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto">
          <div className="m-auto max-w-screen-md p-10">
            <Breadcrumb className="mb-5" />
            <div className="relative">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
