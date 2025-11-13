import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OneFort - Your Financial Fortress on OneChain',
  description:
    'Web2 Simplicity, Web3 Power. Access Web3 payments, identity, and business tools without blockchain complexity.',
  keywords: [
    'OneChain',
    'Web3',
    'Payments',
    'Identity',
    'OneFort',
    'USDO',
    'Crypto Payments',
    'Blockchain',
  ],
  authors: [{ name: 'OneFort Team' }],
  openGraph: {
    title: 'OneFort - Your Financial Fortress on OneChain',
    description: 'Web2 Simplicity, Web3 Power',
    type: 'website',
    locale: 'en_US',
    siteName: 'OneFort',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneFort - Your Financial Fortress on OneChain',
    description: 'Web2 Simplicity, Web3 Power',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
