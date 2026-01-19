'use client';

import { DesktopNav } from './Desktop/DesktopNav';
import { MobileNav } from './Mobile/MobileNav';

export const NavBar = () => {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};
