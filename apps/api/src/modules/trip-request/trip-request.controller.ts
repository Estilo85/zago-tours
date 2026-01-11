import { Request, Response, NextFunction } from 'express';
import { TripRequestService } from './trip-request.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma } from '@zagotours/database';

export class TripRequestController {
  constructor(private readonly tripRequestService: TripRequestService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tripType, destination, date, preferences } = req.body;

      if (!tripType || !destination || !date) {
        return ResponseUtil.error(
          res,
          'Trip type, destination, and date are required',
          400
        );
      }

      const request = await this.tripRequestService.create({
        tripType,
        destination,
        date: new Date(date),
        preferences,
      });

      return ResponseUtil.success(
        res,
        request,
        'Trip request submitted successfully',
        201
      );
    } catch (error) {
      if (error instanceof Error) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        page = 1,
        limit = 10,
        tripType,
        destination,
        startDate,
        endDate,
      } = req.query;

      const filters: Prisma.TripRequestWhereInput = {};

      if (tripType) {
        filters.tripType = String(tripType);
      }

      if (destination) {
        filters.destination = {
          contains: String(destination),
          mode: 'insensitive',
        };
      }

      if (startDate && endDate) {
        filters.date = {
          gte: new Date(String(startDate)),
          lte: new Date(String(endDate)),
        };
      }

      const result = await this.tripRequestService.paginate(
        Number(page),
        Number(limit),
        { where: filters, orderBy: { createdAt: 'desc' } }
      );

      return ResponseUtil.paginated(res, result);
    } catch (error) {
      next(error);
    }
  };

  getRecent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requests = await this.tripRequestService.getRecent();
      return ResponseUtil.success(res, requests);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = await this.tripRequestService.getById(req.params.id);
      return ResponseUtil.success(res, request);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.tripRequestService.delete(req.params.id, true);
      return ResponseUtil.success(
        res,
        null,
        'Trip request deleted successfully'
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };
}
