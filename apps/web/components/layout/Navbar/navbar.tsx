'use client';

import { DesktopNav } from './Desktop/desktop-nav';
import { MobileNav } from './Mobile/mobile-nav';

export const NavBar = () => {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};
