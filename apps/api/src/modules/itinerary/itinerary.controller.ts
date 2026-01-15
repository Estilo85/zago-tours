// ============================================
// FILE: src/modules/itinerary/itinerary.controller.ts
// ============================================
import { Response } from 'express';
import { ItineraryService } from './itinerary.service';
import { ResponseUtil } from 'src/shared/utils/responseUtils';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import {
  ReqBody,
  ReqParams,
  ReqParamsBody,
} from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';
import {
  CreateItineraryDto,
  UpdateItineraryDto,
  BulkCreateItinerariesDto,
} from '@zagotours/types';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';

export class ItineraryController {
  constructor(private readonly service: ItineraryService) {}

  // POST /adventures/:adventureId/itineraries
  create = asyncHandler(
    async (
      req: ReqParamsBody<{ adventureId: string }, CreateItineraryDto>,
      res: Response
    ) => {
      const { adventureId } = req.params;
      const dto: CreateItineraryDto = { ...req.body, adventureId };

      // Handle optional image upload
      if (req.file) {
        const uploadResult = await CloudinaryService.uploadFile(
          req.file,
          'itinerary'
        );
        dto.imageUrl = uploadResult.url;
        dto.publicId = uploadResult.publicId;
      }

      const result = await this.service.create({
        ...dto,
        adventure: {
          connect: { id: adventureId },
        },
      });
      return ResponseUtil.success(res, result, 'Itinerary created', 201);
    }
  );

  // POST /adventures/:adventureId/itineraries/bulk
  createBulk = asyncHandler(
    async (
      req: ReqParamsBody<
        { adventureId: string },
        Omit<BulkCreateItinerariesDto, 'adventureId'>
      >,
      res: Response
    ) => {
      const { adventureId } = req.params;
      const dto: BulkCreateItinerariesDto = {
        adventureId,
        itineraries: req.body.itineraries,
      };

      const result = await this.service.createBulk(dto);
      return ResponseUtil.success(res, result, result.message, 201);
    }
  );

  // GET /adventures/:adventureId/itineraries
  getByAdventure = asyncHandler(
    async (req: ReqParams<{ adventureId: string }>, res: Response) => {
      const itineraries = await this.service.getByAdventure(
        req.params.adventureId
      );
      return ResponseUtil.success(res, itineraries);
    }
  );

  // GET /itineraries/:id
  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const itinerary = await this.service.getById(req.params.id);
    return ResponseUtil.success(res, itinerary);
  });

  // PUT /itineraries/:id
  update = asyncHandler(
    async (
      req: ReqParamsBody<UuidParam, UpdateItineraryDto>,
      res: Response
    ) => {
      const result = await this.service.updateWithImage(
        req.params.id,
        req.body,
        req.file
      );
      return ResponseUtil.success(res, result, 'Itinerary updated');
    }
  );

  // DELETE /itineraries/:id
  delete = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    await this.service.deleteWithImage(req.params.id);
    return ResponseUtil.success(res, null, 'Itinerary deleted');
  });
}
