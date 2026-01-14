import { Request, Response, NextFunction } from 'express';
import { PostService } from './post.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma, MediaType } from '@zagotours/database';
import {
  ReqBodyQuery,
  ReqParams,
  ReqQuery,
  TypedRequest,
} from 'src/shared/types/express.types';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { UuidParam } from 'src/common/validation/common.validation';
import { CreatePostDTO } from '@zagotours/types';

export class PostController {
  constructor(private readonly postService: PostService) {}

  create = asyncHandler(
    async (req: TypedRequest<{}, CreatePostDTO>, res: Response) => {
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
    }
  );

  getAll = asyncHandler(
    async (
      req: ReqQuery<{ page?: number; limit?: number; userId?: string }>,
      res: Response
    ) => {
      const { page = 1, limit = 10, userId } = req.query;

      const filters: Prisma.PostWhereInput = {};

      if (userId) {
        filters.userId = String(userId);
      }

      const result = await this.postService.paginate(
        Number(page),
        Number(limit),
        { where: filters }
      );

      return ResponseUtil.paginated(res, result);
    }
  );

  getFeed = asyncHandler(
    async (req: TypedRequest, res: Response, next: NextFunction) => {
      const posts = await this.postService.getFeed(req.userId!);
      return ResponseUtil.success(res, posts);
    }
  );

  getMyPosts = asyncHandler(async (req: TypedRequest, res: Response) => {
    const posts = await this.postService.getByUser(req.userId!);
    return ResponseUtil.success(res, posts);
  });

  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const post = await this.postService.getPostWithDetails(req.params.id);
    return ResponseUtil.success(res, post);
  });

  update = asyncHandler(async (req: TypedRequest<UuidParam>, res: Response) => {
    const post = await this.postService.updatePost(
      req.params.id,
      req.userId!,
      req.body
    );
    return ResponseUtil.success(res, post, 'Post updated successfully');
  });

  delete = asyncHandler(async (req: TypedRequest<UuidParam>, res: Response) => {
    await this.postService.deletePost(req.params.id, req.userId!);
    return ResponseUtil.success(res, null, 'Post deleted successfully');
  });

  toggleLike = asyncHandler(
    async (req: TypedRequest<UuidParam>, res: Response) => {
      const result = await this.postService.toggleLike(
        req.userId!,
        req.params.id
      );
      return ResponseUtil.success(
        res,
        result,
        result.liked ? 'Post liked' : 'Post unliked'
      );
    }
  );

  sharePost = asyncHandler(
    async (req: TypedRequest<UuidParam>, res: Response) => {
      const result = await this.postService.sharePost(
        req.userId!,
        req.params.id
      );
      return ResponseUtil.success(res, result, 'Post shared successfully');
    }
  );

  addComment = asyncHandler(
    async (
      req: TypedRequest<UuidParam, { content?: string }>,
      res: Response
    ) => {
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
    }
  );

  getComments = asyncHandler(
    async (req: ReqParams<UuidParam>, res: Response) => {
      const comments = await this.postService.getComments(req.params.id);
      return ResponseUtil.success(res, comments);
    }
  );

  deleteComment = asyncHandler(
    async (req: TypedRequest<UuidParam>, res: Response) => {
      await this.postService.deleteComment(req.params.id, req.userId!);
      return ResponseUtil.success(res, null, 'Comment deleted successfully');
    }
  );
}
