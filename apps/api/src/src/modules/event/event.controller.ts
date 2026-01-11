import { Request, Response, NextFunction } from 'express';
import { EventService } from './event.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma } from '@zagotours/database';

export class EventController {
  constructor(private readonly eventService: EventService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      next(error);
    }
  };

  getUpcoming = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await this.eventService.getUpcoming();
      return ResponseUtil.success(res, events);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return ResponseUtil.error(res, 'Id is required', 400);
      }
      const event = await this.eventService.getById(id);
      return ResponseUtil.success(res, event);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await this.eventService.create(req.body);
      return ResponseUtil.success(res, event, 'Event created', 201);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return ResponseUtil.error(res, 'Id is required', 400);
      }
      const event = await this.eventService.update(id, req.body);
      return ResponseUtil.success(res, event, 'Event updated');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return ResponseUtil.error(res, 'Id is required', 400);
      }
      const { hard } = req.query;
      await this.eventService.delete(id, hard === 'true');
      return ResponseUtil.success(res, null, 'Event deleted');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };
}
