import { Response } from 'express';
import { TypedRequest } from 'src/shared/types/express.types';
import { DashboardService } from './dashboard.service';
import { ResponseUtil } from 'src/shared/utils/responseUtils';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { Role } from '@zagotours/database';

export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  /**
   * Get dashboard stats for the current user based on their role
   * Requires authentication middleware to populate req.userId and req.userRole
   */
  getStats = asyncHandler(async (req: TypedRequest, res: Response) => {
    // req.userId and req.userRole must be populated by your auth middleware
    if (!req.userId) {
      return ResponseUtil.error(res, 'Unauthorized', 401);
    }

    if (!req.user?.role) {
      return ResponseUtil.error(res, 'User role not found', 400);
    }

    const result = await this.service.getStatsForUser(
      req.userId,
      req.user.role as Role
    );

    return ResponseUtil.success(res, result);
  });
}
