import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardRepository } from './dashboard.repository';
import { authenticate } from 'src/shared/middleware/authentication.middleware';
import { Role } from '@zagotours/database';
import { authorizeRoles } from 'src/shared/middleware/authorization.middleware';

// Initialize dependencies
const dashboardRepository = new DashboardRepository();
const dashboardService = new DashboardService(dashboardRepository);
const dashboardController = new DashboardController(dashboardService);

const router = Router();

router.get('/stats', authenticate, dashboardController.getMyStats);

router.get(
  '/leaderboard',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  dashboardController.getLeaderboard,
);

router.get(
  '/agent/:agentId',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  dashboardController.getAgentStats,
);

router.get(
  '/affiliate/:affiliateId',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  dashboardController.getAffiliateStats,
);

export { router as dashboardRoute };
