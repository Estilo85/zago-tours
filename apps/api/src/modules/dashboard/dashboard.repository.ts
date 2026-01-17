import { prisma } from '@zagotours/database';
import { GlobalDashboardStats, Role } from '@zagotours/types';

export class DashboardRepository {
  /**
   * CORPORATE AGENT STATS
   * Shows their assigned requests from referrals
   */
  async getCorporateStats(userId: string) {
    const [adventures, tripRequests, callbacks, referrals] =
      await prisma.$transaction([
        prisma.adventure.count(), // All adventures (or filter by company if needed)
        prisma.tripRequest.count({
          where: { assignedAgentId: userId }, // Their assigned requests
        }),
        prisma.callbackRequest.count({
          where: { assignedAgentId: userId }, // Their assigned callbacks
        }),
        prisma.user.count({
          where: { referredById: userId }, // Their referrals
        }),
      ]);

    return {
      totalAdventures: adventures,
      totalTripRequests: tripRequests,
      totalCallbacks: callbacks,
      totalReferrals: referrals,
    };
  }

  /**
   * INDEPENDENT AGENT STATS
   * Shows their calls, requests, and referrals
   */
  async getIndependentStats(userId: string) {
    const [upcoming, completed, cancelled, callbacks, tripRequests, referrals] =
      await prisma.$transaction([
        prisma.tripPlanningCall.count({
          where: { agentId: userId, status: 'SCHEDULED' },
        }),
        prisma.tripPlanningCall.count({
          where: { agentId: userId, status: 'COMPLETED' },
        }),
        prisma.tripPlanningCall.count({
          where: { agentId: userId, status: 'CANCELLED' },
        }),
        prisma.callbackRequest.count({
          where: { assignedAgentId: userId },
        }),
        prisma.tripRequest.count({
          where: { assignedAgentId: userId },
        }),
        prisma.user.count({
          where: { referredById: userId },
        }),
      ]);

    // Points calculation: 100 per referral, 50 per completed call
    const pointsEarned = referrals * 100 + completed * 50;

    return {
      upcomingCalls: upcoming,
      completedCalls: completed,
      cancelledCalls: cancelled,
      totalCallbacks: callbacks,
      totalTripRequests: tripRequests,
      totalReferrals: referrals,
      pointsEarned,
    };
  }

  /**
   * AFFILIATE STATS
   * Shows their referrals and breakdown by role
   */
  async getAffiliateStats(userId: string) {
    const [totalReferrals, activeReferrals, referralsByRole] =
      await prisma.$transaction([
        // Total referrals
        prisma.user.count({
          where: { referredById: userId },
        }),

        // Active referrals (not suspended)
        prisma.user.count({
          where: {
            referredById: userId,
            status: 'ACTIVE',
          },
        }),

        // Referrals grouped by role
        prisma.user.groupBy({
          by: ['role'],
          where: { referredById: userId },
          _count: { role: true },
          orderBy: { role: 'asc' },
        }),
      ]);

    // Build referral breakdown
    const referralBreakdown = {
      adventurers: 0,
      independentAgents: 0,
      corporateAgents: 0,
      affiliates: 0,
    };

    referralsByRole.forEach((group) => {
      const count =
        typeof group._count === 'object' &&
        group._count &&
        typeof group._count.role === 'number'
          ? group._count.role
          : 0;
      switch (group.role) {
        case Role.ADVENTURER:
          referralBreakdown.adventurers = count;
          break;
        case Role.INDEPENDENT_AGENT:
          referralBreakdown.independentAgents = count;
          break;
        case Role.COOPERATE_AGENT:
          referralBreakdown.corporateAgents = count;
          break;
        case Role.AFFILIATE:
          referralBreakdown.affiliates = count;
          break;
      }
    });

    // Points: 100 per referral
    const pointsEarned = totalReferrals * 100;

    return {
      totalReferrals,
      activeReferrals,
      pointsEarned,
      referralBreakdown,
    };
  }

  /**
   * ADMIN/SUPER_ADMIN STATS
   * Complete system overview
   */
  async getFullSystemStats(): Promise<GlobalDashboardStats> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      usersByRole,
      activeToday,
      newThisMonth,
      totalAdventures,
      verifiedAdventures,
      activeAdventures,
      avgPrice,
      totalPosts,
      totalComments,
      totalReviews,
      avgRating,
      totalReferrals,
      topReferrers,
      totalTripRequests,
      totalCallbackRequests,
      totalPlanningCalls,
      pendingCallbacks,
    ] = await prisma.$transaction([
      // Users
      prisma.user.count(),
      prisma.user.groupBy({
        by: ['role'],
        _count: { role: true },
        orderBy: { role: 'asc' },
      }),
      prisma.user.count({
        where: {
          updatedAt: { gte: startOfToday },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),

      // Adventures
      prisma.adventure.count(),
      prisma.adventure.count({ where: { isVerified: true } }),
      prisma.adventure.count({ where: { status: 'ACTIVE' } }),
      prisma.adventure.aggregate({
        _avg: { price: true },
      }),

      // Community
      prisma.post.count(),
      prisma.comment.count(),
      prisma.review.count(),
      prisma.review.aggregate({
        _avg: { rating: true },
      }),

      // Referrals
      prisma.user.count({
        where: { referredById: { not: null } },
      }),
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          _count: {
            select: { referees: true },
          },
        },
        where: {
          referees: {
            some: {},
          },
        },
        orderBy: {
          referees: { _count: 'desc' },
        },
        take: 5,
      }),

      // Requests
      prisma.tripRequest.count(),
      prisma.callbackRequest.count(),
      prisma.tripPlanningCall.count(),
      prisma.callbackRequest.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    // Build byRole record
    const byRole: Record<Role, number> = {
      [Role.SUPER_ADMIN]: 0,
      [Role.ADMIN]: 0,
      [Role.AFFILIATE]: 0,
      [Role.ADVENTURER]: 0,
      [Role.INDEPENDENT_AGENT]: 0,
      [Role.COOPERATE_AGENT]: 0,
    };

    usersByRole.forEach((group) => {
      const count =
        typeof group._count === 'object' &&
        group._count &&
        typeof group._count.role === 'number'
          ? group._count.role
          : 0;
      byRole[group.role] = count;
    });

    return {
      users: {
        total: totalUsers,
        byRole,
        activeToday,
        newThisMonth,
      },
      adventures: {
        total: totalAdventures,
        verified: verifiedAdventures,
        avgPrice: Number(avgPrice._avg.price) || 0,
        activeAdventures,
      },
      community: {
        totalPosts,
        totalReviews,
        avgRating: Number(avgRating._avg.rating) || 0,
        totalComments,
      },
      referrals: {
        totalReferrals,
        topReferrers: topReferrers.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as unknown as Role,
          referralCount: user._count.referees,
        })),
      },
      requests: {
        totalTripRequests,
        totalCallbackRequests,
        totalPlanningCalls,
        pendingCallbacks,
      },
    };
  }
}
