import { BarChart, HelpCircle, PieChart } from 'lucide-react';
import {
  LuLayoutDashboard,
  LuCalendar,
  LuMapPin,
  LuSettings,
  LuShieldCheck,
  LuUsers,
  LuPlane,
  LuBriefcase,
  LuBuilding2,
  LuTicket,
  LuDollarSign,
  LuHeart,
  LuUserPlus,
  LuClipboardList,
} from 'react-icons/lu';

export const MENU_CONFIG = {
  common: {
    main: [
      { label: 'Dashboard', icon: LuLayoutDashboard, href: '/dashboard' },
      { label: 'Events', icon: LuCalendar, href: '/event' },
      { label: 'Adventures', icon: LuMapPin, href: '/adventure' },
    ],
    support: [
      { label: 'Help Center', icon: HelpCircle, href: '/help' },
      { label: 'Settings', icon: LuSettings, href: '/setting' },
    ],
  },
  roles: {
    'super-admin': [
      { label: 'Admin Panel', icon: LuShieldCheck, href: '/super-admin' },
      { label: 'Manage Users', icon: LuUsers, href: '/super-admin/users' },
      {
        label: 'Manage Agents',
        icon: LuBriefcase,
        href: '/super-admin/agents',
      },
      {
        label: 'System Analytics',
        icon: PieChart,
        href: '/super-admin/analytics',
      },
    ],
    'independent-agent': [
      { label: 'My Dashboard', icon: LuBriefcase, href: '/independent-agent' },
      {
        label: 'My Bookings',
        icon: LuTicket,
        href: '/independent-agent/bookings',
      },
      {
        label: 'Commissions',
        icon: LuDollarSign,
        href: '/independent-agent/commissions',
      },
    ],
    'corporate-agent': [
      { label: 'My Dashboard', icon: LuBuilding2, href: '/corporate-agent' },
      {
        label: 'Team Management',
        icon: LuUsers,
        href: '/corporate-agent/team',
      },
      {
        label: 'Client Management',
        icon: LuUserPlus,
        href: '/corporate-agent/clients',
      },
      { label: 'Reports', icon: BarChart, href: '/corporate-agent/reports' },
    ],
    adventurer: [
      { label: 'My Trips', icon: LuPlane, href: '/adventurer' },
      { label: 'Wishlist', icon: LuHeart, href: '/adventurer/wishlist' },
      {
        label: 'My Bookings',
        icon: LuClipboardList,
        href: '/adventurer/bookings',
      },
    ],
    affiliate: [
      { label: 'My Dashboard', icon: LuDollarSign, href: '/affiliate' },
      { label: 'My Referrals', icon: LuUserPlus, href: '/affiliate/referrals' },
      { label: 'Earnings', icon: LuDollarSign, href: '/affiliate/earnings' },
    ],
  },
};

export type UserRole =
  | 'super-admin'
  | 'independent-agent'
  | 'corporate-agent'
  | 'adventurer'
  | 'affiliate';
