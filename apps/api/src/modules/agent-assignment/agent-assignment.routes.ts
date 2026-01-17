import { Router } from 'express';

import { AgentAssignmentController } from './agent-assignment.controller';

import { Role } from '@zagotours/database';
import { AgentAssignmentService } from './agent-assignment.service';

const agentAssignmentService = new AgentAssignmentService();
const agentAssignmentController = new AgentAssignmentController(
  agentAssignmentService
);

const router = Router();

router.get('/agents/available', agentAssignmentController.getAvailableAgents);
router.get('/agents/:id/validate', agentAssignmentController.validateAgent);

// Admin endpoints - Assignment stats and testing
router.get(
  '/agents/assignment-stats',
  agentAssignmentController.getAssignmentStats
);
router.post(
  '/agents/test-auto-assign',
  agentAssignmentController.testAutoAssignment
);

export default router;
