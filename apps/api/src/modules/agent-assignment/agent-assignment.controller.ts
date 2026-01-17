import { Response } from 'express';
import { ResponseUtil } from 'src/shared/utils/responseUtils';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { TypedRequest, ReqParams } from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';
import { AgentAssignmentService } from './agent-assignment.service';

export class AgentAssignmentController {
  constructor(private readonly assignmentService: AgentAssignmentService) {}

  /**
   * Get all available agents for selection
   * Used by users when manually selecting an agent
   */
  getAvailableAgents = asyncHandler(
    async (req: TypedRequest, res: Response) => {
      const agents = await this.assignmentService.getAgentsForSelection();
      return ResponseUtil.success(
        res,
        agents,
        'Available agents retrieved successfully'
      );
    }
  );

  /**
   * Get agent assignment statistics
   * Admin only - shows workload distribution across all agents
   */
  getAssignmentStats = asyncHandler(
    async (req: TypedRequest, res: Response) => {
      const stats = await this.assignmentService.getAssignmentStats();
      return ResponseUtil.success(
        res,
        stats,
        'Assignment statistics retrieved successfully'
      );
    }
  );

  /**
   * Validate if an agent is valid and active
   * Useful for frontend validation before selection
   */
  validateAgent = asyncHandler(
    async (req: ReqParams<UuidParam>, res: Response) => {
      const isValid = await this.assignmentService.validateAgent(req.params.id);

      if (!isValid) {
        return ResponseUtil.error(
          res,
          'Agent is not valid or is inactive',
          400
        );
      }

      return ResponseUtil.success(res, { valid: true, agentId: req.params.id });
    }
  );

  /**
   * Manually trigger auto-assignment for testing
   * Admin only - useful for testing round-robin logic
   */
  testAutoAssignment = asyncHandler(
    async (req: TypedRequest, res: Response) => {
      const assignedAgentId = await this.assignmentService.autoAssignAgent();

      if (!assignedAgentId) {
        return ResponseUtil.error(
          res,
          'No agents available for assignment',
          404
        );
      }

      return ResponseUtil.success(
        res,
        { assignedAgentId },
        'Agent auto-assigned successfully'
      );
    }
  );
}
