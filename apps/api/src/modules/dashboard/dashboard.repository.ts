import { Prisma, prisma } from '@zagotours/database';
import {
  Role,
  CorporateAgentStats,
  IndependentAgentStats,
  AffiliateStats,
  AdminStats,
  AdventurerStats,
} from '@zagotours/types';
import { BaseRepository } from 'src/common/repository/base.repository';

export class DashboardRepository extends BaseRepository<
  Prisma.UserGetPayload<{}>,
  Prisma.UserWhereInput,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  // Point the delegate to user
  protected readonly modelDelegate = prisma.user;

  // Add to dashboard.repository.ts

  // ==================== ADVENTURER STATS ====================
  async getAdventurerStats(userId: string): Promise<AdventurerStats> {
    const [
      upcomingEvents,
      completedEvents,
      totalBookings,
      likedAdventures,
      postsCreated,
      reviewsWritten,
      scheduledCalls,
      tripRequests,
      callbackRequests,
      referrals,
    ] = await this.prisma.$transaction([
      // Upcoming events
      this.prisma.eventRegistration.count({
        where: {
          userId,
          status: 'CONFIRMED',
          event: { date: { gte: new Date() } },
        },
      }),
      // Completed/attended events
      this.prisma.eventRegistration.count({
        where: {
          userId,
          status: 'ATTENDED',
        },
      }),
      // Total bookings (all registrations)
      this.prisma.eventRegistration.count({
        where: { userId },
      }),
      // Liked adventures
      this.prisma.adventureLike.count({
        where: { userId },
      }),
      // Posts created
      this.prisma.post.count({
        where: { userId },
      }),
      // Reviews written
      this.prisma.review.count({
        where: { userId },
      }),
      // Scheduled calls
      this.prisma.tripPlanningCall.count({
        where: {
          adventurerId: userId,
          status: 'SCHEDULED',
        },
      }),
      // Trip requests
      this.prisma.tripRequest.count({
        where: { adventurerId: userId },
      }),
      // Callback requests
      this.prisma.callbackRequest.count({
        where: { adventurerId: userId },
      }),
      // Referrals
      this.prisma.user.count({
        where: { referredById: userId },
      }),
    ]);

    return {
      trips: {
        upcomingEvents,
        completedEvents,
        totalBookings,
      },
      engagement: {
        likedAdventures,
        postsCreated,
        reviewsWritten,
      },
      planning: {
        scheduledCalls,
        tripRequests,
        callbackRequests,
      },
      referrals: {
        total: referrals,
        pointsEarned: referrals * 100,
      },
    };
  }

  // ==================== CORPORATE AGENT STATS ====================
  async getCorporateAgentStats(userId: string): Promise<CorporateAgentStats> {
    const [tripRequests, callbacks, referrals] = await this.prisma.$transaction(
      [
        this.prisma.tripRequest.count({ where: { assignedAgentId: userId } }),
        this.prisma.callbackRequest.count({
          where: { assignedAgentId: userId },
        }),
        this.prisma.user.count({ where: { referredById: userId } }),
      ],
    );

    return {
      assignedRequests: {
        totalTripRequests: tripRequests,
        totalCallbackRequests: callbacks,
      },
      referrals: { total: referrals, pointsEarned: referrals * 100 },
    };
  }

  // ==================== INDEPENDENT AGENT STATS ====================
  async getIndependentAgentStats(
    userId: string,
  ): Promise<IndependentAgentStats> {
    const [upcoming, completed, cancelled, callbacks, tripRequests, referrals] =
      await this.prisma.$transaction([
        this.prisma.tripPlanningCall.count({
          where: { agentId: userId, status: 'SCHEDULED' },
        }),
        this.prisma.tripPlanningCall.count({
          where: { agentId: userId, status: 'COMPLETED' },
        }),
        this.prisma.tripPlanningCall.count({
          where: { agentId: userId, status: 'CANCELLED' },
        }),
        this.prisma.callbackRequest.count({
          where: { assignedAgentId: userId },
        }),
        this.prisma.tripRequest.count({ where: { assignedAgentId: userId } }),
        this.prisma.user.count({ where: { referredById: userId } }),
      ]);

    const referralPoints = referrals * 100;
    const callPoints = completed * 50;

    return {
      calls: {
        upcomingCalls: upcoming,
        completedCalls: completed,
        cancelledCalls: cancelled,
      },
      assignedRequests: {
        totalCallbackRequests: callbacks,
        totalTripRequests: tripRequests,
      },
      referrals: { total: referrals, pointsEarned: referralPoints },
      totalPointsEarned: referralPoints + callPoints,
    };
  }

  // ==================== AFFILIATE STATS ====================
  async getAffiliateStats(userId: string): Promise<AffiliateStats> {
    const [totalReferrals, activeReferrals, referralsByRole] =
      await this.prisma.$transaction([
        this.prisma.user.count({ where: { referredById: userId } }),
        this.prisma.user.count({
          where: { referredById: userId, status: 'ACTIVE' },
        }),
        this.prisma.user.groupBy({
          by: ['role'],
          where: { referredById: userId },
          _count: { role: true },
          orderBy: { _count: { role: 'desc' } },
        }),
      ]);

    const breakdown = {
      adventurers: 0,
      independentAgents: 0,
      corporateAgents: 0,
      affiliates: 0,
    };

    // Cast group to handle the Prisma Union type error
    (referralsByRole as any[]).forEach((group) => {
      const count = group._count?.role || 0;
      switch (group.role) {
        case Role.ADVENTURER:
          breakdown.adventurers = count;
          break;
        case Role.INDEPENDENT_AGENT:
          breakdown.independentAgents = count;
          break;
        case Role.COOPERATE_AGENT:
          breakdown.corporateAgents = count;
          break;
        case Role.AFFILIATE:
          breakdown.affiliates = count;
          break;
      }
    });

    return {
      referrals: { total: totalReferrals, active: activeReferrals, breakdown },
      pointsEarned: totalReferrals * 100,
    };
  }

  // ==================== ADMIN STATS ====================
  async getAdminStats(): Promise<AdminStats> {
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
      totalEvents,
      upcomingEvents,
      totalEventRegistrations,
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
    ] = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.user.groupBy({
        by: ['role'],
        _count: { role: true },
        orderBy: { _count: { role: 'desc' } },
      }),
      this.prisma.user.count({ where: { updatedAt: { gte: startOfToday } } }),
      this.prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
      this.prisma.adventure.count(),
      this.prisma.adventure.count({ where: { isVerified: true } }),
      this.prisma.adventure.count({ where: { status: 'ACTIVE' } }),
      this.prisma.adventure.aggregate({ _avg: { price: true } }),
      this.prisma.event.count(),
      this.prisma.event.count({ where: { date: { gte: new Date() } } }),
      this.prisma.eventRegistration.count(),
      this.prisma.post.count(),
      this.prisma.comment.count(),
      this.prisma.review.count(),
      this.prisma.review.aggregate({ _avg: { rating: true } }),
      this.prisma.user.count({ where: { referredById: { not: null } } }),
      this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          _count: {
            select: {
              referees: true,
              agentCalls: { where: { status: 'COMPLETED' } },
            },
          },
        },
        where: { referees: { some: {} } },
        orderBy: { referees: { _count: 'desc' } },
        take: 10,
      }),
      this.prisma.tripRequest.count(),
      this.prisma.callbackRequest.count(),
      this.prisma.tripPlanningCall.count(),
      this.prisma.callbackRequest.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

    const byRole: Record<Role, number> = {
      [Role.SUPER_ADMIN]: 0,
      [Role.ADMIN]: 0,
      [Role.AFFILIATE]: 0,
      [Role.ADVENTURER]: 0,
      [Role.INDEPENDENT_AGENT]: 0,
      [Role.COOPERATE_AGENT]: 0,
    };

    // Cast usersByRole as any to bypass the Prisma internal 'true | object' union error
    (usersByRole as any[]).forEach((group) => {
      if (group.role) byRole[group.role as Role] = group._count?.role || 0;
    });

    return {
      users: { total: totalUsers, byRole, activeToday, newThisMonth },
      adventures: {
        total: totalAdventures,
        verified: verifiedAdventures,
        active: activeAdventures,
        avgPrice: Number((avgPrice as any)._avg?.price) || 0,
      },
      events: {
        total: totalEvents,
        upcoming: upcomingEvents,
        totalRegistrations: totalEventRegistrations,
      },
      community: {
        totalPosts,
        totalComments,
        totalReviews,
        avgRating: Number((avgRating as any)._avg?.rating) || 0,
      },
      referrals: {
        total: totalReferrals,
        topReferrers: topReferrers.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role as Role,
          referralCount: u._count.referees,
          pointsEarned:
            u._count.referees * 100 +
            (u.role === Role.INDEPENDENT_AGENT ? u._count.agentCalls * 50 : 0),
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

  async getTopAgentsByPoints(limit: number = 10) {
    const agents = await this.prisma.user.findMany({
      where: { role: { in: [Role.INDEPENDENT_AGENT, Role.COOPERATE_AGENT] } },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        _count: {
          select: {
            referees: true,
            agentCalls: { where: { status: 'COMPLETED' } },
          },
        },
      },
      take: limit * 2,
    });

    return agents
      .map((a) => ({
        id: a.id,
        name: a.name,
        email: a.email,
        role: a.role as Role,
        pointsEarned:
          a._count.referees * 100 +
          (a.role === Role.INDEPENDENT_AGENT ? a._count.agentCalls * 50 : 0),
      }))
      .sort((a, b) => b.pointsEarned - a.pointsEarned)
      .slice(0, limit);
  }

  async getTopAffiliatesByPoints(limit: number = 10) {
    const affiliates = await this.prisma.user.findMany({
      where: { role: Role.AFFILIATE },
      select: {
        id: true,
        name: true,
        email: true,
        _count: { select: { referees: true } },
      },
      orderBy: { referees: { _count: 'desc' } },
      take: limit,
    });
    return affiliates.map((a) => ({
      id: a.id,
      name: a.name,
      email: a.email,
      referralCount: a._count.referees,
      pointsEarned: a._count.referees * 100,
    }));
  }
}
