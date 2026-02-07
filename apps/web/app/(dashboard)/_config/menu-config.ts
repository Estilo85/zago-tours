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
  { label: 'Dashboard', icon: LuShieldCheck, href: '/dashboard' },

  // User Management
  { label: 'Users', icon: LuUsers, href: '/admin/users' },

  // Content Management
  { label: 'Adventures', icon: LuMapPin, href: '/admin/adventures' },
  { label: 'Events', icon: LuCalendar, href: '/admin/events' },
  { label: 'Reviews', icon: LuStar, href: '/admin/reviews' },
  { label: 'Posts', icon: LuMessagesSquare, href: '/admin/posts' },

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
  { label: 'Destinations', icon: LuGlobe, href: '/admin/destinations' },

  // Settings
  { label: 'Platform Settings', icon: LuSettings, href: '/admin/settings' },
];

export const MENU_CONFIG = {
  common: {
    main: [
      { label: 'Events', icon: LuCalendar, href: '/dashboard/event' },
      { label: 'Adventures', icon: LuMapPin, href: '/dashboard/adventure' },
    ],
    support: [
      { label: 'Help', icon: HelpCircle, href: '/dashboard/help' },
      { label: 'Settings', icon: LuSettings, href: '/dashboard/setting' },
    ],
  },
  roles: {
    [Role.SUPER_ADMIN]: adminMenuItems,
    [Role.ADMIN]: adminMenuItems,
    [Role.INDEPENDENT_AGENT]: [
      { label: 'Dashboard', icon: LuBriefcase, href: '/dashboard' },
      {
        label: 'Media kits',
        icon: LuTicket,
        href: '/independent-agent/media-kits',
      },
    ],
    [Role.COOPERATE_AGENT]: [
      { label: 'Dashboard', icon: LuBuilding2, href: '/dashboard' },
      {
        label: 'Trip-request',
        icon: LuUsers,
        href: '/corporate-agent/trip-request',
      },
    ],
    [Role.ADVENTURER]: [
      { label: 'Dashboard', icon: LuPlane, href: '/dashboard' },
      {
        label: 'Unlocked Tours',
        icon: LuMapPin,
        href: '/adventurer/unlocked-tours',
      },
    ],
    [Role.AFFILIATE]: [
      { label: 'Dashboard', icon: LuDollarSign, href: '/dashboard' },
      { label: 'Contracts', icon: LuUserPlus, href: '/affiliate/contracts' },
    ],
  },
};

export type UserRole = Role;
