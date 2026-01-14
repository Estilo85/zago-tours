import { Response } from 'express';
import { GalleryService } from './gallery.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { Prisma, MediaType } from '@zagotours/database';
import { ReqBody, ReqParams, ReqQuery } from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';

export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  upload = asyncHandler(
    async (
      req: ReqBody<{
        mediaUrl?: string;
        mediaType?: string;
        altText?: string;
        adventureId?: string;
      }>,
      res: Response
    ) => {
      const { mediaUrl, mediaType, altText, adventureId } = req.body;

      if (!mediaUrl || !mediaType) {
        return ResponseUtil.error(res, 'Media URL and type are required', 400);
      }

      const media = await this.galleryService.uploadMedia({
        userId: req.userId!,
        mediaUrl,
        mediaType: mediaType as MediaType,
        altText,
        adventureId,
      });

      return ResponseUtil.success(
        res,
        media,
        'Media uploaded successfully',
        201
      );
    }
  );

  getAll = asyncHandler(
    async (
      req: ReqQuery<{
        page?: number;
        limit?: number;
        adventureId: string;
        userId: string;
        mediaType: string;
      }>,
      res: Response
    ) => {
      const {
        page = 1,
        limit = 10,
        adventureId,
        userId,
        mediaType,
      } = req.query;

      const filters: Prisma.GalleryWhereInput = {};

      if (adventureId) {
        filters.adventureId = String(adventureId);
      }

      if (userId) {
        filters.uploadedBy = String(userId);
      }

      if (mediaType) {
        filters.mediaType = mediaType as MediaType;
      }

      const result = await this.galleryService.paginate(
        Number(page),
        Number(limit),
        { where: filters }
      );

      return ResponseUtil.paginated(res, result);
    }
  );

  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const media = await this.galleryService.getById(req.params.id);
    return ResponseUtil.success(res, media);
  });

  delete = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    await this.galleryService.delete(req.params.id);
    return ResponseUtil.success(res, null, 'Media deleted successfully');
  });
}
