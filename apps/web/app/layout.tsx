import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from '@/components/ui/toaster';
import { Provider } from '@/components/ui/provider';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/footer/Footer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    icon: '/icons/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <Flex direction='column' minH='100dvh' overflowX='visible'>
            <Navbar />

            <Box
              as='main'
              flex='1'
              width='100%'
              display='flex'
              flexDirection='column'
            >
              {children}
            </Box>

            <Footer />
          </Flex>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
