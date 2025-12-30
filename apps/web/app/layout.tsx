import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from '@/components/ui/toaster';
import { Provider } from '@/components/ui/provider';
import { Box, Flex } from '@chakra-ui/react';
import { NavBar } from '@/components/layout/Header/navbar';
import { Footer } from '@/components/layout/Footer/footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
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
          <Flex direction='column' minH='100vh'>
            <NavBar />

            <Box as='main' flex='1'>
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
