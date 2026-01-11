import { Response, NextFunction } from 'express';
import { AdventureService } from './adventure.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { AdventureStatus, AdventureLevel } from '@zagotours/database';
import { CreateAdventureDTO, UpdateAdventureDTO } from '@zagotours/types';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import {
  ReqBody,
  ReqParams,
  ReqParamsBody,
  ReqParamsQuery,
  ReqQuery,
} from 'src/shared/types/express.types';
import {
  PaginationQuery,
  UuidParam,
} from 'src/common/validation/common.validation';

export class AdventureController {
  constructor(private readonly service: AdventureService) {}

  //==== CREATE NEW ADVENTURE ======
  create = asyncHandler(
    async (req: ReqBody<CreateAdventureDTO>, res: Response) => {
      const result = await this.service.create(req.body);
      return ResponseUtil.success(res, result, 'Created', 201);
    }
  );

  //==== CREATE MULTIPLE ADVENTURES ======
  createBulk = asyncHandler(
    async (req: ReqBody<CreateAdventureDTO[]>, res: Response) => {
      const adventures = req.body;
      // Validation: Ensure it's a non-empty array
      if (!Array.isArray(adventures) || adventures.length === 0) {
        return ResponseUtil.error(
          res,
          'A non-empty array of adventures is required',
          400
        );
      }
      const result = await this.service.createBulk(adventures);
      return ResponseUtil.success(res, result, result.message, 201);
    }
  );

  //==== UPDATE AN ADVENTURE ======
  update = asyncHandler(
    async (
      req: ReqParamsBody<UuidParam, UpdateAdventureDTO>,
      res: Response
    ) => {
      const result = await this.service.update(req.params.id, req.body);
      return ResponseUtil.success(res, result, 'Adventure updated');
    }
  );

  //==== GET ALL ADVENTURES ======

  getAll = asyncHandler(
    async (
      req: ReqQuery<
        PaginationQuery & {
          status?: AdventureStatus;
          level?: AdventureLevel;
          location: string;
          search?: string;
          tripType?: string;
          maxPrice?: number;
          minPrice?: number;
        }
      >,
      res
    ) => {
      const {
        page = '1',
        limit = '10',
        status,
        level,
        location,
        search,
        tripType,
        maxPrice,
        minPrice,
      } = req.query;

      const where: any = { deletedAt: null };

      // --- FILTERS ---
      if (status) where.status = status;
      if (level) where.level = level;

      if (location) {
        where.location = { contains: location, mode: 'insensitive' };
      }

      if (tripType) {
        where.tripType = { contains: tripType, mode: 'insensitive' };
      }

      // --- PRICE RANGE ---
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = Number(minPrice);
        if (maxPrice) where.price.lte = Number(maxPrice);
      }

      // --- GLOBAL SEARCH ---
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { tripType: { contains: search, mode: 'insensitive' } },
        ];
      }

      const result = await this.service.paginate(Number(page), Number(limit), {
        where,
        orderBy: { createdAt: 'desc' },
      });

      return ResponseUtil.paginated(res, result);
    }
  );

  //==== GET ADVENTURE BY ID ======
  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const adventure = await this.service.getById(req.params.id);
    return ResponseUtil.success(res, adventure);
  });

  //==== DELETE AN ADVENTURE ======
  delete = asyncHandler(
    async (req: ReqParamsQuery<UuidParam, { hard: string }>, res: Response) => {
      const isHard = req.query.hard === 'true';

      await this.service.delete(req.params.id, isHard);
      return ResponseUtil.success(res, null, 'Deleted');
    }
  );

  //==== TOGGLING  ADVENTURE LIKE ======
  toggleLike = asyncHandler(
    async (req: ReqParams<UuidParam>, res: Response) => {
      const result = await this.service.toggleLike(req.userId!, req.params.id);

      return ResponseUtil.success(res, result);
    }
  );
}
