import { Request, Response, NextFunction } from 'express';
import { GalleryService } from './gallery.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma, MediaType } from '@zagotours/database';

export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        filters
      );

      return ResponseUtil.paginated(res, result);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const media = await this.galleryService.getById(req.params.id);
      return ResponseUtil.success(res, media);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.galleryService.delete(req.params.id);
      return ResponseUtil.success(res, null, 'Media deleted successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };
}
