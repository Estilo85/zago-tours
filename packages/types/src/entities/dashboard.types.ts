import { Role } from '../enums';

// ==================== BASE METRICS ====================

/**
 * Common metrics shared across different dashboard views
 */
export interface ReferralMetrics {
  totalReferrals: number;
  activeReferrals: number;
  pointsEarned: number;
}

export interface CallMetrics {
  upcomingCalls: number;
  completedCalls: number;
  cancelledCalls: number;
}

export interface RequestMetrics {
  totalTripRequests: number;
  totalCallbackRequests: number;
}

export interface ReferralBreakdown {
  adventurers: number;
  independentAgents: number;
  corporateAgents: number;
  affiliates: number;
}

// ==================== ROLE-SPECIFIC STATS ====================

// Add to your dashboard.types.ts

/**
 * Dashboard statistics for Adventurers
 * Shows their travel activity and engagement
 */
export interface AdventurerStats {
  trips: {
    upcomingEvents: number;
    completedEvents: number;
    totalBookings: number;
  };
  engagement: {
    likedAdventures: number;
    postsCreated: number;
    reviewsWritten: number;
  };
  planning: {
    scheduledCalls: number;
    tripRequests: number;
    callbackRequests: number;
  };
  referrals: {
    total: number;
    pointsEarned: number;
  };
}

/**
 * Dashboard statistics for Corporate Agents
 * Shows assigned requests from referrals
 */
export interface CorporateAgentStats {
  assignedRequests: RequestMetrics;
  referrals: {
    total: number;
    pointsEarned: number;
  };
}

/**
 * Dashboard statistics for Independent Agents
 * Shows calls, requests, and referrals with point tracking
 */
export interface IndependentAgentStats {
  calls: CallMetrics;
  assignedRequests: RequestMetrics;
  referrals: {
    total: number;
    pointsEarned: number;
  };
  totalPointsEarned: number;
}

/**
 * Dashboard statistics for Affiliates
 * Shows detailed referral breakdown and point tracking
 */
export interface AffiliateStats {
  referrals: {
    total: number;
    active: number;
    breakdown: ReferralBreakdown;
  };
  pointsEarned: number; // 100 points per referral
}

/**
 * Comprehensive dashboard statistics for Admins and Super Admins
 * Provides complete system overview
 */
export interface AdminStats {
  users: {
    total: number;
    byRole: Record<Role, number>;
    activeToday: number;
    newThisMonth: number;
  };
  adventures: {
    total: number;
    verified: number;
    active: number;
    avgPrice: number;
  };
  events: {
    total: number;
    upcoming: number;
    totalRegistrations: number;
  };
  community: {
    totalPosts: number;
    totalComments: number;
    totalReviews: number;
    avgRating: number;
  };
  referrals: {
    total: number;
    topReferrers: Array<{
      id: string;
      name: string;
      email: string;
      role: Role;
      referralCount: number;
      pointsEarned: number;
    }>;
  };
  requests: {
    totalTripRequests: number;
    totalCallbackRequests: number;
    totalPlanningCalls: number;
    pendingCallbacks: number; // Last 7 days
  };
}

// ==================== DASHBOARD RESPONSE TYPE ====================

/**
 * Type-safe dashboard response discriminated by user role
 */
export type DashboardStatsResponse =
  | { role: Role.COOPERATE_AGENT; stats: CorporateAgentStats }
  | { role: Role.INDEPENDENT_AGENT; stats: IndependentAgentStats }
  | { role: Role.AFFILIATE; stats: AffiliateStats }
  | { role: Role.ADMIN | Role.SUPER_ADMIN; stats: AdminStats }
  | { role: Role.ADVENTURER; stats: AdventurerStats };

// ==================== ANALYTICS DTOs (Optional - for future analytics endpoints) ====================

/**
 * Date range filter for analytics queries
 */
export interface DateRangeFilter {
  startDate: Date;
  endDate: Date;
}

/**
 * Analytics overview with time-series data
 */
export interface AnalyticsOverview extends DateRangeFilter {
  metrics: {
    newUsers: number;
    newAdventures: number;
    newPosts: number;
    newReviews: number;
    totalRevenue: number;
  };
  trends: Array<{
    date: Date;
    users: number;
    adventures: number;
    posts: number;
    revenue: number;
  }>;
}

/**
 * Top performers across the platform
 */
export interface TopPerformers {
  topAdventures: Array<{
    id: string;
    title: string;
    rating: number;
    totalLikes: number;
  }>;
  topAgents: Array<{
    id: string;
    name: string;
    role: Role.INDEPENDENT_AGENT | Role.COOPERATE_AGENT;
    completedCalls: number;
    totalReferrals: number;
    pointsEarned: number;
  }>;
  topAffiliates: Array<{
    id: string;
    name: string;
    totalReferrals: number;
    pointsEarned: number;
  }>;
}
