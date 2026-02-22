import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Provider } from '@/components/ui/provider';
import Navbar from '@/components/layout/navbar/Navbar';

import styles from './layout.module.css';
import {
  ClientFooter,
  ClientToaster,
} from '@/components/layout/ClientComponents';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zagotours',
  description: 'Travel with ease',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <Provider>
          <div className={styles.layout}>
            <header className={styles.header}>
              <Navbar />
            </header>
            <main className={styles.main}>{children}</main>
            <ClientFooter />
          </div>
          <ClientToaster />
        </Provider>
      </body>
    </html>
  );
}
