import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeScript } from '@/components/theme-script';
import './globals.css';

const switzer = localFont({
  src: [
    {
      path: '../public/fonts/Switzer-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Switzer-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Switzer-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-switzer',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sakthi Sarani S — Portfolio',
  description: 'BTech CS Engineering student — projects, background, and blog',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${switzer.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="bg-surface-light dark:bg-surface-dark text-ink dark:text-mint transition-colors">
        {children}
      </body>
    </html>
  );
}
