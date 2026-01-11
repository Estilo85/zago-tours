import { Request, Response, NextFunction } from 'express';
import { TripPlanningCallService } from './trip-planning-call.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma, CallStatus } from '@zagotours/database';

export class TripPlanningCallController {
  constructor(private readonly callService: TripPlanningCallService) {}

  scheduleCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      if (error instanceof Error) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  };

  rescheduleCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      if (error instanceof Error) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  };

  cancelCall = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reason } = req.body;

      const call = await this.callService.cancelCall(req.params.id, reason);
      return ResponseUtil.success(res, call, 'Call cancelled successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      if (error instanceof Error) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  };

  markAsCompleted = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const call = await this.callService.markAsCompleted(req.params.id);
      return ResponseUtil.success(res, call, 'Call marked as completed');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      if (error instanceof Error) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  };

  getUpcoming = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const calls = await this.callService.getUpcoming(req.userId!);
      return ResponseUtil.success(res, calls);
    } catch (error) {
      next(error);
    }
  };

  getMyCalls = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        filters
      );

      return ResponseUtil.paginated(res, result);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const call = await this.callService.getById(req.params.id);
      return ResponseUtil.success(res, call);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.callService.delete(req.params.id, true);
      return ResponseUtil.success(res, null, 'Call deleted successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };
}
