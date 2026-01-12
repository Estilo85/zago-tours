import { HelpCircle } from 'lucide-react';
import {
  LuLayoutDashboard,
  LuUser,
  LuSettings,
  LuMessageSquare,
  LuShieldCheck,
  LuUsers,
  LuPlane,
} from 'react-icons/lu';

export const MENU_CONFIG = {
  common: {
    settings: [
      { label: 'Dashboard', icon: LuLayoutDashboard, href: '/dashboard' },
      { label: 'Profile', icon: LuUser, href: '/dashboard/profile' },
      {
        label: 'Preferences',
        icon: LuSettings,
        href: '/dashboard/preferences',
      },
    ],
    support: [
      { label: 'Help Center', icon: HelpCircle, href: '/dashboard/help' },
      { label: 'Feedback', icon: LuMessageSquare, href: '/dashboard/feedback' },
    ],
  },
  roles: {
    'super-admin': [
      { label: 'Admin Panel', icon: LuShieldCheck, href: '/super-admin' },
      { label: 'Manage Users', icon: LuUsers, href: '/super-admin/users' },
    ],
    adventurer: [{ label: 'My Trips', icon: LuPlane, href: '/adventurer' }],
  },
};
