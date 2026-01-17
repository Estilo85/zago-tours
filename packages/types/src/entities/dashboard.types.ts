import { Role } from '../enums';

export interface GlobalDashboardStats {
  users: {
    total: number;
    byRole: Record<Role, number>;
    activeToday: number;
    newThisMonth: number;
  };
  adventures: {
    total: number;
    verified: number;
    avgPrice: number;
    activeAdventures: number;
  };
  community: {
    totalPosts: number;
    totalReviews: number;
    avgRating: number;
    totalComments: number;
  };
  referrals: {
    totalReferrals: number;
    topReferrers: Array<{
      id: string;
      name: string;
      email: string;
      role: Role;
      referralCount: number;
    }>;
  };
  requests: {
    totalTripRequests: number;
    totalCallbackRequests: number;
    totalPlanningCalls: number;
    pendingCallbacks: number;
  };
}

export interface CorporateAgentStats {
  totalAdventures: number;
  totalTripRequests: number;
  totalCallbacks: number;
  totalReferrals: number;
}

export interface IndependentAgentStats {
  upcomingCalls: number;
  completedCalls: number;
  cancelledCalls: number;
  totalCallbacks: number;
  totalTripRequests: number;
  totalReferrals: number;
  pointsEarned: number;
}

export interface AffiliateStats {
  totalReferrals: number;
  activeReferrals: number;
  pointsEarned: number;
  referralBreakdown: {
    adventurers: number;
    independentAgents: number;
    corporateAgents: number;
    affiliates: number;
  };
}

export interface AdminStats extends GlobalDashboardStats {}

export type DashboardStatsResponse =
  | { role: Role.COOPERATE_AGENT; stats: CorporateAgentStats }
  | { role: Role.INDEPENDENT_AGENT; stats: IndependentAgentStats }
  | { role: Role.AFFILIATE; stats: AffiliateStats }
  | { role: Role.ADMIN | Role.SUPER_ADMIN; stats: AdminStats };
