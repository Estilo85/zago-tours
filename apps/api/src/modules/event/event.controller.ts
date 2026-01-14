import { Request, Response, NextFunction } from 'express';
import { EventService } from './event.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma } from '@zagotours/database';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import {
  ReqBody,
  ReqParams,
  ReqParamsBody,
  ReqParamsQuery,
  ReqQuery,
  TypedRequest,
} from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';
import { CreateEventDTO, UpdateEventDTO } from '@zagotours/types';

export class EventController {
  constructor(private readonly eventService: EventService) {}

  getAll = asyncHandler(
    async (
      req: ReqQuery<{
        page?: number;
        limit?: number;
        location?: string;
        startDate?: string;
        endDate?: string;
      }>,
      res: Response
    ) => {
      const { page = 1, limit = 10, location, startDate, endDate } = req.query;

      const filters: Prisma.EventWhereInput = { deletedAt: null };

      if (location) {
        filters.location = {
          contains: String(location),
          mode: 'insensitive',
        };
      }

      if (startDate && endDate) {
        filters.date = {
          gte: new Date(String(startDate)),
          lte: new Date(String(endDate)),
        };
      }

      // Use base paginate with proper signature
      const result = await this.eventService.paginate(
        Number(page),
        Number(limit),
        {
          where: filters,
          orderBy: { date: 'asc' },
        }
      );

      return ResponseUtil.paginated(res, result);
    }
  );

  getUpcoming = asyncHandler(async (req: TypedRequest, res: Response) => {
    const events = await this.eventService.getUpcoming();
    return ResponseUtil.success(res, events);
  });

  getById = asyncHandler(
    async (req: ReqParams<UuidParam>, res: Response, next: NextFunction) => {
      const event = await this.eventService.getById(req.params.id);
      return ResponseUtil.success(res, event);
    }
  );

  create = asyncHandler(async (req: ReqBody<CreateEventDTO>, res: Response) => {
    const event = await this.eventService.create(req.body);
    return ResponseUtil.success(res, event, 'Event created', 201);
  });

  update = asyncHandler(
    async (req: ReqParamsBody<UuidParam, UpdateEventDTO>, res: Response) => {
      const event = await this.eventService.update(req.params.id, req.body);
      return ResponseUtil.success(res, event, 'Event updated');
    }
  );

  delete = asyncHandler(
    async (
      req: ReqParamsQuery<UuidParam, { hard?: string }>,
      res: Response
    ) => {
      const isHard = req.query.hard === 'true';
      await this.eventService.delete(req.params.id, isHard);
      return ResponseUtil.success(res, null, 'Event deleted');
    }
  );
}
