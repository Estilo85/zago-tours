import { Role } from '@zagotours/types';
import { BarChart, HelpCircle, PieChart } from 'lucide-react';
import {
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
  LuUserPlus,
  LuPhone,
  LuFileText,
  LuStar,
  LuMessagesSquare,
  LuClipboardList,
  LuGlobe,
  LuSignature,
} from 'react-icons/lu';

// Comprehensive admin menu items
const adminMenuItems = [
  { label: 'Dashboard', icon: LuShieldCheck, href: '/admin' },

  // User Management
  { label: 'Manage Users', icon: LuUsers, href: '/admin/users' },
  { label: 'Manage Agents', icon: LuBriefcase, href: '/admin/agents' },
  { label: 'Manage Affiliates', icon: LuUserPlus, href: '/admin/affiliates' },

  // Content Management
  { label: 'Manage Adventures', icon: LuMapPin, href: '/admin/adventures' },
  { label: 'Manage Events', icon: LuCalendar, href: '/admin/events' },
  { label: 'Manage Reviews', icon: LuStar, href: '/admin/reviews' },
  { label: 'Community Posts', icon: LuMessagesSquare, href: '/admin/posts' },

  // Requests & Planning
  {
    label: 'Trip Requests',
    icon: LuClipboardList,
    href: '/admin/trip-requests',
  },
  { label: 'Callback Requests', icon: LuPhone, href: '/admin/callbacks' },
  { label: 'Planning Calls', icon: LuTicket, href: '/admin/planning-calls' },
  { label: 'Inquiries', icon: LuFileText, href: '/admin/inquiries' },

  // Business Management
  { label: 'Contracts', icon: LuSignature, href: '/admin/contracts' },
  { label: 'Destinations', icon: LuGlobe, href: '/admin/destinations' },

  // Analytics & Reports
  { label: 'System Analytics', icon: PieChart, href: '/admin/analytics' },
  { label: 'Reports', icon: BarChart, href: '/admin/reports' },

  // Settings
  { label: 'Platform Settings', icon: LuSettings, href: '/admin/settings' },
];

export const MENU_CONFIG = {
  common: {
    main: [
      { label: 'Events', icon: LuCalendar, href: '/event' },
      { label: 'Adventures', icon: LuMapPin, href: '/adventure' },
    ],
    support: [
      { label: 'Help Center', icon: HelpCircle, href: '/help' },
      { label: 'Settings', icon: LuSettings, href: '/setting' },
    ],
  },
  roles: {
    [Role.SUPER_ADMIN]: adminMenuItems,
    [Role.ADMIN]: adminMenuItems,
    [Role.INDEPENDENT_AGENT]: [
      { label: 'Dashboard', icon: LuBriefcase, href: '/independent-agent' },
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
    [Role.COOPERATE_AGENT]: [
      { label: 'Dashboard', icon: LuBuilding2, href: '/corporate-agent' },
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
    [Role.ADVENTURER]: [
      { label: 'Dashboard', icon: LuPlane, href: '/adventurer' },
      { label: 'Requests', icon: LuPhone, href: '/adventurer/trip-requests' },
      { label: 'Callbacks', icon: LuPhone, href: '/adventurer/callbacks' },
    ],
    [Role.AFFILIATE]: [
      { label: 'Dashboard', icon: LuDollarSign, href: '/affiliate' },
      { label: 'My Referrals', icon: LuUserPlus, href: '/affiliate/referrals' },
      { label: 'Earnings', icon: LuDollarSign, href: '/affiliate/earnings' },
    ],
  },
};

export type UserRole = Role;
