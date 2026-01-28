import {
  LuUsers,
  LuPlaneTakeoff,
  LuCalendarCheck,
  LuPhone,
  LuUserPlus,
  LuStar,
  LuTrendingUp,
  LuFileText,
  LuHeart,
} from 'react-icons/lu';
import {
  AdminStats,
  CorporateAgentStats,
  IndependentAgentStats,
  AffiliateStats,
  AdventurerStats,
} from '@zagotours/types';
import { StatCardData } from './stat-card';

export const getAdminStatsConfig = (data: AdminStats): StatCardData[] => [
  {
    label: 'Total Users',
    value: data.users.total.toLocaleString(),
    icon: LuUsers,
  },
  {
    label: 'Total Adventures',
    value: data.adventures.total.toLocaleString(),
    icon: LuPlaneTakeoff,
  },
  {
    label: 'Upcoming Events',
    value: data.events.upcoming.toLocaleString(),
    icon: LuCalendarCheck,
  },
  {
    label: 'Total Posts',
    value: data.community.totalPosts.toLocaleString(),
    icon: LuFileText,
  },
  {
    label: 'Avg Rating',
    value: data.community.avgRating?.toFixed(1) || '0.0',
    trend: `${data.community.totalReviews} reviews`,
    icon: LuStar,
  },
];

export const getCorporateAgentStatsConfig = (
  data: CorporateAgentStats,
): StatCardData[] => [
  {
    label: 'Trip Requests',
    value: data.assignedRequests.totalTripRequests.toLocaleString(),
    icon: LuPlaneTakeoff,
  },
  {
    label: 'Callback Requests',
    value: data.assignedRequests.totalCallbackRequests.toLocaleString(),
    icon: LuPhone,
  },
  {
    label: 'Total Referrals',
    value: data.referrals.total.toLocaleString(),
    icon: LuUserPlus,
  },
  {
    label: 'Points Earned',
    value: data.referrals.pointsEarned.toLocaleString(),
    icon: LuStar,
  },
];

export const getIndependentAgentStatsConfig = (
  data: IndependentAgentStats,
): StatCardData[] => [
  {
    label: 'Upcoming Calls',
    value: data.calls.upcomingCalls.toLocaleString(),
    icon: LuCalendarCheck,
  },
  {
    label: 'Completed Calls',
    value: data.calls.completedCalls.toLocaleString(),
    icon: LuPhone,
  },
  {
    label: 'Total Referrals',
    value: data.referrals.total.toLocaleString(),
    icon: LuUserPlus,
  },
  {
    label: 'Total Points',
    value: data.totalPointsEarned.toLocaleString(),
    icon: LuTrendingUp,
  },
];

export const getAffiliateStatsConfig = (
  data: AffiliateStats,
): StatCardData[] => [
  {
    label: 'Total Referrals',
    value: data.referrals.total.toLocaleString(),
    icon: LuUserPlus,
  },
  {
    label: 'Active Referrals',
    value: data.referrals.active.toLocaleString(),
    icon: LuUsers,
  },
  {
    label: 'Points Earned',
    value: data.pointsEarned.toLocaleString(),
    icon: LuStar,
  },
  {
    label: 'Adventurers',
    value: data.referrals.breakdown.adventurers.toLocaleString(),
    icon: LuPlaneTakeoff,
  },
];

export const getAdventurerStatsConfig = (
  data: AdventurerStats,
): StatCardData[] => [
  {
    label: 'Upcoming Events',
    value: data.trips.upcomingEvents.toLocaleString(),
    icon: LuCalendarCheck,
  },
  {
    label: 'Liked Adventures',
    value: data.engagement.likedAdventures.toLocaleString(),
    icon: LuHeart,
  },
  {
    label: 'Reviews Written',
    value: data.engagement.reviewsWritten.toLocaleString(),
    icon: LuStar,
  },
  {
    label: 'Referral Points',
    value: data.referrals.pointsEarned.toLocaleString(),
    trend: `${data.referrals.total} referrals`,
    icon: LuUserPlus,
  },
];
