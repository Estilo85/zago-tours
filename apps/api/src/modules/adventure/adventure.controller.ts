import { Response } from 'express';
import { AdventureService } from './adventure.service';
import { ResponseUtil } from 'src/shared/utils/responseUtils';
import {
  AdventureListQueryDto,
  CreateAdventureDto,
  UpdateAdventureDto,
} from '@zagotours/types';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import {
  ReqBody,
  ReqParams,
  ReqParamsBody,
  ReqParamsQuery,
  ReqQuery,
} from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';

export class AdventureController {
  constructor(private readonly service: AdventureService) {}

  //==== CREATE NEW ADVENTURE ======
  create = asyncHandler(
    async (req: ReqBody<CreateAdventureDto>, res: Response) => {
      const adventureData = req.body;

      if (req.file) {
        const uploadResult = await CloudinaryService.uploadFile(
          req.file,
          'adventure',
        );
        adventureData.mediaUrl = uploadResult.url;
        adventureData.publicId = uploadResult.publicId;
      }

      const result = await this.service.create(adventureData);
      return ResponseUtil.success(res, result, 'Created', 201);
    },
  );

  //==== CREATE MULTIPLE ADVENTURES ======
  createBulk = asyncHandler(
    async (req: ReqBody<CreateAdventureDto[]>, res: Response) => {
      const adventures = req.body;

      if (!Array.isArray(adventures) || adventures.length === 0) {
        return ResponseUtil.error(
          res,
          'A non-empty array of adventures is required',
          400,
        );
      }

      const result = await this.service.createBulk(adventures);
      return ResponseUtil.success(res, result, result.message, 201);
    },
  );

  //==== UPDATE AN ADVENTURE ======
  update = asyncHandler(
    async (
      req: ReqParamsBody<UuidParam, UpdateAdventureDto>,
      res: Response,
    ) => {
      const adventureData = req.body;
      const { id } = req.params;

      const existingAdventure = await this.service.getById(id);

      if (req.file) {
        if (existingAdventure.publicId) {
          await CloudinaryService.deleteFile(existingAdventure.publicId);
        }

        const uploadResult = await CloudinaryService.uploadFile(
          req.file,
          'adventure',
        );
        adventureData.mediaUrl = uploadResult.url;
        adventureData.publicId = uploadResult.publicId;
      }

      const result = await this.service.update(id, adventureData);
      return ResponseUtil.success(res, result, 'Adventure updated');
    },
  );

  //==== GET ALL ADVENTURES ======
  getAll = asyncHandler(
    async (req: ReqQuery<AdventureListQueryDto>, res: Response) => {
      const {
        page = '1',
        limit = '10',
        status,
        level,
        access,
        location,
        search,
        tripType,
        maxPrice,
        minPrice,
      } = req.query;

      const where: any = { deletedAt: null };

      if (status) where.status = status.toUpperCase();
      if (level) where.level = level.toUpperCase();
      if (access) where.access = access.toUpperCase();
      if (tripType) where.tripType = tripType.toUpperCase();

      if (location) {
        where.location = { contains: location, mode: 'insensitive' };
      }

      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = Number(minPrice);
        if (maxPrice) where.price.lte = Number(maxPrice);
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } },
          { certification: { contains: search, mode: 'insensitive' } },
          { gear: { contains: search, mode: 'insensitive' } },
        ];
      }

      const result = await this.service.paginate(Number(page), Number(limit), {
        where,
        orderBy: { createdAt: 'desc' },
      });

      return ResponseUtil.paginated(res, result);
    },
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
      const { id } = req.params;

      const adventure = await this.service.getById(id);

      if (isHard && adventure.publicId) {
        await CloudinaryService.deleteFile(adventure.publicId);
      }

      await this.service.delete(id, isHard);
      return ResponseUtil.success(res, null, 'Deleted');
    },
  );

  //==== TOGGLING ADVENTURE LIKE ======
  toggleLike = asyncHandler(
    async (req: ReqParams<UuidParam>, res: Response) => {
      const result = await this.service.toggleLike(req.userId!, req.params.id);
      return ResponseUtil.success(res, result);
    },
  );
}
