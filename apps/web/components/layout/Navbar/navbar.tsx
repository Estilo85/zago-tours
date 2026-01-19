'use client';

import { DesktopNav } from '../../ui/navigation/navbar/DesktopNav';
import { MobileNav } from '../../ui/navigation/navbar/MobileNav';

export const Navbar = () => {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};
