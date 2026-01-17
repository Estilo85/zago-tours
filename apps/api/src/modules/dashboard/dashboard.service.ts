import { Role } from '@zagotours/database';
import { DashboardRepository } from './dashboard.repository';
import { DashboardStatsResponse } from '@zagotours/types';

export class DashboardService {
  constructor(private readonly repo: DashboardRepository) {}

  async getStatsForUser(
    userId: string,
    role: Role
  ): Promise<DashboardStatsResponse> {
    switch (role) {
      case Role.COOPERATE_AGENT:
        return {
          role: role as any,
          stats: await this.repo.getCorporateStats(userId),
        };

      case Role.INDEPENDENT_AGENT:
        return {
          role: role as any,
          stats: await this.repo.getIndependentStats(userId),
        };

      case Role.AFFILIATE:
        return {
          role: role as any,
          stats: await this.repo.getAffiliateStats(userId),
        };

      case Role.ADMIN:
      case Role.SUPER_ADMIN:
        return {
          role: role as any,
          stats: await this.repo.getFullSystemStats(),
        };

      case Role.ADVENTURER:
        // Adventurers don't have a dashboard, or you can create one
        throw new Error('Adventurers do not have a dashboard');

      default:
        throw new Error('No dashboard defined for this role');
    }
  }
}
