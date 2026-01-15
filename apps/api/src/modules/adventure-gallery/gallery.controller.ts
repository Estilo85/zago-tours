import { Response } from 'express';
import { AdventureGalleryService } from './gallery.service';
import { ResponseUtil } from 'src/shared/utils/responseUtils';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import {
  ReqBody,
  ReqParams,
  ReqParamsBody,
} from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';
import {
  CreateAdventureGalleryDto,
  UpdateAdventureGalleryDto,
  BulkUploadGalleryDto,
  ReorderGalleryDto,
  MediaType,
} from '@zagotours/types';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';

export class AdventureGalleryController {
  constructor(private readonly service: AdventureGalleryService) {}

  create = asyncHandler(
    async (
      req: ReqParamsBody<{ adventureId: string }, CreateAdventureGalleryDto>,
      res: Response
    ) => {
      const { adventureId } = req.params;
      const dto = req.body;

      if (!req.file) {
        return ResponseUtil.error(res, 'Media file is required', 400);
      }

      // Upload to Cloudinary
      const uploadResult = await CloudinaryService.uploadFile(
        req.file,
        'adventure-gallery'
      );

      const galleryData = {
        ...dto,
        adventure: {
          connect: { id: adventureId },
        },
        mediaUrl: uploadResult.url,
        publicId: uploadResult.publicId,
      };

      const result = await this.service.create(galleryData);
      return ResponseUtil.success(
        res,
        result,
        'Media uploaded successfully',
        201
      );
    }
  );

  bulkUpload = asyncHandler(
    async (
      req: ReqParamsBody<
        { adventureId: string },
        Omit<BulkUploadGalleryDto, 'media'> // This now includes mediaTypes/altTexts
      >,
      res: Response
    ) => {
      const { adventureId } = req.params;
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return ResponseUtil.error(
          res,
          'At least one media file is required',
          400
        );
      }

      // 1. Upload to Cloudinary
      const uploadPromises = files.map((file) =>
        CloudinaryService.uploadFile(file, 'adventure-gallery')
      );
      const uploadResults = await Promise.all(uploadPromises);

      const media = uploadResults.map((upload, index) => ({
        mediaUrl: upload.url,
        publicId: upload.publicId,
        mediaType:
          (req.body.mediaTypes?.[index] as MediaType) || MediaType.IMAGE,
        altText: req.body.altTexts?.[index],
      }));

      // 3. Send to service
      const result = await this.service.bulkUpload({ adventureId, media });
      return ResponseUtil.success(
        res,
        result,
        'Gallery updated successfully',
        201
      );
    }
  );

  // GET /adventures/:adventureId/gallery
  getByAdventure = asyncHandler(
    async (req: ReqParams<{ adventureId: string }>, res: Response) => {
      const gallery = await this.service.getByAdventure(req.params.adventureId);
      return ResponseUtil.success(res, gallery);
    }
  );

  // GET /gallery/:id
  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const item = await this.service.getById(req.params.id);
    return ResponseUtil.success(res, item);
  });

  // PUT /gallery/:id (update metadata only - altText, order)
  update = asyncHandler(
    async (
      req: ReqParamsBody<UuidParam, UpdateAdventureGalleryDto>,
      res: Response
    ) => {
      const result = await this.service.update(req.params.id, req.body);
      return ResponseUtil.success(res, result, 'Gallery item updated');
    }
  );

  // PUT /gallery/reorder (bulk reorder)
  reorder = asyncHandler(
    async (req: ReqBody<ReorderGalleryDto>, res: Response) => {
      const result = await this.service.reorder(req.body);
      return ResponseUtil.success(res, result, result.message);
    }
  );

  // DELETE /gallery/:id (soft delete with Cloudinary cleanup)
  delete = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    await this.service.deleteWithMedia(req.params.id);
    return ResponseUtil.success(res, null, 'Gallery item deleted');
  });

  // DELETE /gallery/:id?hard=true (hard delete with Cloudinary cleanup)
  hardDelete = asyncHandler(
    async (req: ReqParams<UuidParam>, res: Response) => {
      const item = await this.service.getById(req.params.id);

      // Delete from Cloudinary
      if (item.publicId) {
        await CloudinaryService.deleteFile(item.publicId);
      }

      // Hard delete from database
      await this.service.delete(req.params.id);
      return ResponseUtil.success(
        res,
        null,
        'Gallery item permanently deleted'
      );
    }
  );
}
