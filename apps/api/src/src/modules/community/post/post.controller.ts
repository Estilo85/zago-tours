import { Request, Response, NextFunction } from 'express';
import { PostService } from './post.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma, MediaType } from '@zagotours/database';

export class PostController {
  constructor(private readonly postService: PostService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, mediaUrl, mediaType } = req.body;

      if (!title || !description) {
        return ResponseUtil.error(
          res,
          'Title and description are required',
          400
        );
      }

      const post = await this.postService.createPost(req.userId!, {
        title,
        description,
        mediaUrl,
        mediaType: mediaType as MediaType,
      });

      return ResponseUtil.success(res, post, 'Post created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, userId } = req.query;

      const filters: Prisma.PostWhereInput = {};

      if (userId) {
        filters.userId = String(userId);
      }

      const result = await this.postService.paginate(
        Number(page),
        Number(limit),
        filters
      );

      return ResponseUtil.paginated(res, result);
    } catch (error) {
      next(error);
    }
  };

  getFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.getFeed(req.userId!);
      return ResponseUtil.success(res, posts);
    } catch (error) {
      next(error);
    }
  };

  getMyPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.getByUser(req.userId!);
      return ResponseUtil.success(res, posts);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.getPostWithDetails(req.params.id);
      return ResponseUtil.success(res, post);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.updatePost(
        req.params.id,
        req.userId!,
        req.body
      );
      return ResponseUtil.success(res, post, 'Post updated successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return ResponseUtil.error(res, error.message, 403);
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.postService.deletePost(req.params.id, req.userId!);
      return ResponseUtil.success(res, null, 'Post deleted successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return ResponseUtil.error(res, error.message, 403);
      }
      next(error);
    }
  };

  toggleLike = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.postService.toggleLike(
        req.userId!,
        req.params.id
      );
      return ResponseUtil.success(
        res,
        result,
        result.liked ? 'Post liked' : 'Post unliked'
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  sharePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.postService.sharePost(
        req.userId!,
        req.params.id
      );
      return ResponseUtil.success(res, result, 'Post shared successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content } = req.body;

      if (!content) {
        return ResponseUtil.error(res, 'Comment content is required', 400);
      }

      const comment = await this.postService.addComment(
        req.userId!,
        req.params.id,
        content
      );

      return ResponseUtil.success(
        res,
        comment,
        'Comment added successfully',
        201
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      if (error instanceof Error) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  };

  getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comments = await this.postService.getComments(req.params.id);
      return ResponseUtil.success(res, comments);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.postService.deleteComment(req.params.commentId, req.userId!);
      return ResponseUtil.success(res, null, 'Comment deleted successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return ResponseUtil.error(res, error.message, 403);
      }
      next(error);
    }
  };
}
