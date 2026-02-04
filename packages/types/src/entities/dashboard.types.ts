import { Role } from '../enums';

// ==================== BASE METRICS ====================

/**
 * Common metrics shared across different dashboard views
 */
export interface ReferralMetrics {
  total: number;
  active: number;
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
  referrals: ReferralMetrics;
}

/**
 * Dashboard statistics for Corporate Agents
 * Shows their own requests and referrals (no assignment system)
 */
export interface CorporateAgentStats {
  requests: RequestMetrics;
  referrals: ReferralMetrics;
}

/**
 * Dashboard statistics for Independent Agents
 * Shows calls, requests, and referrals with point tracking
 */
export interface IndependentAgentStats {
  calls: CallMetrics;
  requests: RequestMetrics;
  referrals: ReferralMetrics;
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
  pointsEarned: number;
}

/**
 * Comprehensive dashboard statistics for Admins and Super Admins
 * Provides complete system overview including all incoming requests
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
    pendingCallbacks: number;
    unassignedTripRequests: number;
    unassignedCallbacks: number;
  };
}

// ==================== DASHBOARD RESPONSE TYPE ====================

/**
 * Type-safe dashboard response discriminated by user role
 */
export type DashboardStatsResponse =
  | { role: 'COOPERATE_AGENT'; stats: CorporateAgentStats }
  | { role: 'INDEPENDENT_AGENT'; stats: IndependentAgentStats }
  | { role: 'AFFILIATE'; stats: AffiliateStats }
  | { role: 'ADMIN' | 'SUPER_ADMIN'; stats: AdminStats }
  | { role: 'ADVENTURER'; stats: AdventurerStats };

// ==================== LEADERBOARD TYPES ====================

/**
 * Top performers across the platform
 */
export interface TopPerformers {
  topAgents: Array<{
    id: string;
    name: string;
    email: string;
    role: 'INDEPENDENT_AGENT' | 'COOPERATE_AGENT';
    pointsEarned: number;
  }>;
  topAffiliates: Array<{
    id: string;
    name: string;
    email: string;
    referralCount: number;
    pointsEarned: number;
  }>;
}

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
