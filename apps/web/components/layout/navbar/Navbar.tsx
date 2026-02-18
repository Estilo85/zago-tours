'use client';

import { DesktopNav } from '../../ui/navigation/navbar/DesktopNav';
import { MobileNav } from '../../ui/navigation/navbar/MobileNav';

export default function Navbar() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}
