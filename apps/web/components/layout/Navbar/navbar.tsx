'use client';

import { DesktopNav } from './desktop/DesktopNav';
import { MobileNav } from './mobile/MobileNav';

export const NavBar = () => {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};
