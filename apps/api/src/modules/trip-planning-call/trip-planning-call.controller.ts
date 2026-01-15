import { Request, Response, NextFunction } from 'express';
import { TripPlanningCallService } from './trip-planning-call.service';
import { ResponseUtil } from 'src/shared/utils/responseUtils';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma, CallStatus } from '@zagotours/database';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import {
  ReqBody,
  ReqParams,
  ReqQuery,
  TypedRequest,
} from 'src/shared/types/express.types';
import { CreateTripPlanningCallDto } from '@zagotours/types';
import { UuidParam } from 'src/common/validation/common.validation';

export class TripPlanningCallController {
  constructor(private readonly callService: TripPlanningCallService) {}

  scheduleCall = asyncHandler(
    async (req: TypedRequest<{}, CreateTripPlanningCallDto>, res: Response) => {
      const { agentId, startTime, endTime, meetingLink } = req.body;

      if (!agentId || !startTime) {
        return ResponseUtil.error(
          res,
          'Agent ID and start time are required',
          400
        );
      }

      const call = await this.callService.scheduleCall({
        adventurerId: req.userId!,
        agentId,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : undefined,
        meetingLink,
      });

      return ResponseUtil.success(
        res,
        call,
        'Call scheduled successfully',
        201
      );
    }
  );

  rescheduleCall = asyncHandler(
    async (
      req: TypedRequest<UuidParam, { startTime?: string; endTime?: string }>,
      res: Response
    ) => {
      const { startTime, endTime } = req.body;

      if (!startTime) {
        return ResponseUtil.error(res, 'Start time is required', 400);
      }

      const call = await this.callService.rescheduleCall(
        req.params.id,
        new Date(startTime),
        endTime ? new Date(endTime) : undefined
      );

      return ResponseUtil.success(res, call, 'Call rescheduled successfully');
    }
  );

  cancelCall = asyncHandler(
    async (
      req: TypedRequest<UuidParam, { reason?: string }>,
      res: Response
    ) => {
      const { reason } = req.body;

      const call = await this.callService.cancelCall(req.params.id, reason);
      return ResponseUtil.success(res, call, 'Call cancelled successfully');
    }
  );

  markAsCompleted = asyncHandler(
    async (req: ReqParams<UuidParam>, res: Response, next: NextFunction) => {
      const call = await this.callService.markAsCompleted(req.params.id);
      return ResponseUtil.success(res, call, 'Call marked as completed');
    }
  );

  getUpcoming = asyncHandler(async (req: TypedRequest, res: Response) => {
    const calls = await this.callService.getUpcoming(req.userId!);
    return ResponseUtil.success(res, calls);
  });

  getMyCalls = asyncHandler(
    async (req: TypedRequest<{}, {}, { role?: string }>, res: Response) => {
      const { role } = req.query;

      let calls;
      if (role === 'adventurer') {
        calls = await this.callService.getByAdventurer(req.userId!);
      } else if (role === 'agent') {
        calls = await this.callService.getByAgent(req.userId!);
      } else {
        // Get both
        const [adventurerCalls, agentCalls] = await Promise.all([
          this.callService.getByAdventurer(req.userId!),
          this.callService.getByAgent(req.userId!),
        ]);
        calls = [...adventurerCalls, ...agentCalls];
      }

      return ResponseUtil.success(res, calls);
    }
  );

  getAll = asyncHandler(
    async (
      req: ReqQuery<{
        page?: number;
        limit?: number;
        status?: string;
        startDate?: string;
        endDate?: string;
      }>,
      res: Response
    ) => {
      const { page = 1, limit = 10, status, startDate, endDate } = req.query;

      const filters: Prisma.TripPlanningCallWhereInput = {};

      if (status) {
        filters.status = status as CallStatus;
      }

      if (startDate && endDate) {
        filters.startTime = {
          gte: new Date(String(startDate)),
          lte: new Date(String(endDate)),
        };
      }

      const result = await this.callService.paginate(
        Number(page),
        Number(limit),
        { where: filters }
      );

      return ResponseUtil.paginated(res, result);
    }
  );

  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const call = await this.callService.getById(req.params.id);
    return ResponseUtil.success(res, call);
  });

  delete = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    await this.callService.delete(req.params.id, true);
    return ResponseUtil.success(res, null, 'Call deleted successfully');
  });
}
