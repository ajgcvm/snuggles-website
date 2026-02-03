// Snuggles Pet Boarding - Root Layout
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Snuggles Pet Boarding | Melbourne, FL',
    template: '%s | Snuggles Pet Boarding',
  },
  description:
    'Family-owned pet boarding in Melbourne, FL. Where dogs, cats, and birds roam free on our farm. Daily photo updates included.',
  keywords: ['pet boarding', 'dog boarding', 'cat boarding', 'Melbourne FL', 'pet daycare'],
  openGraph: {
    title: 'Snuggles Pet Boarding',
    description:
      'Family-owned pet boarding in Melbourne, FL. Where dogs, cats, and birds roam free on our farm.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#16a34a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} bg-stone-50 text-stone-800 font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
