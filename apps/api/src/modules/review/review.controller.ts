import { Request, Response, NextFunction } from 'express';
import { ReviewService } from './review.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma } from '@zagotours/database';

export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content, rating } = req.body;

      if (!content || !rating) {
        return ResponseUtil.error(res, 'Content and rating are required', 400);
      }

      const review = await this.reviewService.create({
        title,
        content,
        rating: Number(rating),
        user: { connect: { id: req.userId! } },
      });

      return ResponseUtil.success(
        res,
        review,
        'Review created successfully',
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
      const { page = 1, limit = 10, rating, userId, featured } = req.query;

      const filters: Prisma.ReviewWhereInput = {};

      if (rating) {
        filters.rating = Number(rating);
      }

      if (userId) {
        filters.userId = String(userId);
      }

      if (featured === 'true') {
        filters.isFeatured = true;
      }

      const result = await this.reviewService.paginate(
        Number(page),
        Number(limit),
        filters
      );

      return ResponseUtil.paginated(res, result);
    } catch (error) {
      next(error);
    }
  };

  getFeatured = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await this.reviewService.getFeatured();
      return ResponseUtil.success(res, reviews);
    } catch (error) {
      next(error);
    }
  };

  getMyReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await this.reviewService.getByUser(req.userId!);
      return ResponseUtil.success(res, reviews);
    } catch (error) {
      next(error);
    }
  };

  getAverageRating = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.reviewService.getAverageRating();
      return ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.getById(req.params.id);
      return ResponseUtil.success(res, review);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.getById(req.params.id);

      // Only allow user to update their own review
      if (review.userId !== req.userId) {
        return ResponseUtil.error(res, 'Unauthorized', 403);
      }

      const updated = await this.reviewService.update(req.params.id, req.body);
      return ResponseUtil.success(res, updated, 'Review updated successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  toggleFeatured = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.toggleFeatured(req.params.id);
      return ResponseUtil.success(
        res,
        review,
        `Review ${review.isFeatured ? 'featured' : 'unfeatured'} successfully`
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.getById(req.params.id);

      // Only allow user to delete their own review (or admin)
      if (review.userId !== req.userId && !req.role?.includes('ADMIN')) {
        return ResponseUtil.error(res, 'Unauthorized', 403);
      }

      await this.reviewService.delete(req.params.id, true);
      return ResponseUtil.success(res, null, 'Review deleted successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };
}
