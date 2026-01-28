import { Router } from 'express';

import { AgentAssignmentController } from './agent-assignment.controller';

import { Role } from '@zagotours/database';
import { AgentAssignmentService } from './agent-assignment.service';
import { authenticate } from 'src/shared/middleware/authentication.middleware';

const agentAssignmentService = new AgentAssignmentService();
const agentAssignmentController = new AgentAssignmentController(
  agentAssignmentService,
);

const router = Router();

router.get(
  '/agents/available',
  authenticate,
  agentAssignmentController.getAvailableAgents,
);
router.get(
  '/agents/:id/validate',
  authenticate,
  agentAssignmentController.validateAgent,
);

// Admin endpoints - Assignment stats and testing
router.get(
  '/agents/assignment-stats',
  authenticate,
  agentAssignmentController.getAssignmentStats,
);
router.post(
  '/agents/test-auto-assign',
  authenticate,
  agentAssignmentController.testAutoAssignment,
);

export default router;
