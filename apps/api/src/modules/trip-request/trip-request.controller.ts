import { Request, Response, NextFunction } from 'express';
import { TripRequestService } from './trip-request.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma } from '@zagotours/database';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import {
  ReqBody,
  ReqParams,
  ReqQuery,
  TypedRequest,
} from 'src/shared/types/express.types';
import { CreateTripRequestDTO } from '@zagotours/types';
import { UuidParam } from 'src/common/validation/common.validation';

export class TripRequestController {
  constructor(private readonly tripRequestService: TripRequestService) {}

  create = asyncHandler(
    async (req: ReqBody<CreateTripRequestDTO>, res: Response) => {
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
    }
  );

  getAll = asyncHandler(
    async (
      req: ReqQuery<{
        page?: number;
        limit?: number;
        tripType?: string;
        destination?: string;
        startDate?: string;
        endDate?: string;
      }>,
      res: Response
    ) => {
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
    }
  );

  getRecent = asyncHandler(async (req: TypedRequest, res: Response) => {
    const requests = await this.tripRequestService.getRecent();
    return ResponseUtil.success(res, requests);
  });

  getById = async (req: ReqParams<UuidParam>, res: Response) => {
    const request = await this.tripRequestService.getById(req.params.id);
    return ResponseUtil.success(res, request);
  };

  delete = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    await this.tripRequestService.delete(req.params.id, true);
    return ResponseUtil.success(res, null, 'Trip request deleted successfully');
  });
}
