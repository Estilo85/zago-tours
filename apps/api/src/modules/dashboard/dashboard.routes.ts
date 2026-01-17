import { Router } from 'express';

import { DashboardController } from './dashboard.controller';

import { DashboardService } from './dashboard.service';
import { DashboardRepository } from './dashboard.repository';

const dashboardRepository = new DashboardRepository();
const dashboardService = new DashboardService(dashboardRepository);
const dashboardController = new DashboardController(dashboardService);

const router = Router();

// Role-based dashboard stats
router.get('/dashboard/stats', dashboardController.getStats);

export default router;
