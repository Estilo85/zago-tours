'use client';

import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer/Footer'), { ssr: false });

const Toaster = dynamic(() => import('../ui/toaster').then((m) => m.Toaster), {
  ssr: false,
});

export function ClientFooter() {
  return <Footer />;
}

export function ClientToaster() {
  return <Toaster />;
}
