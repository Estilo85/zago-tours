import { Post, prisma, Prisma } from '@zagotours/database';
import {
  BaseService,
  NotFoundException,
} from 'src/common/service/base.service';
import { PostRepository } from './post.repository';

export class PostService extends BaseService<
  Post,
  Prisma.PostWhereInput,
  Prisma.PostCreateInput,
  Prisma.PostUpdateInput,
  Prisma.PostInclude
> {
  protected readonly resourceName = 'Post';

  constructor(private readonly postRepo: PostRepository) {
    super(postRepo);
  }

  // Create post
  async createPost(
    userId: string,
    data: {
      title: string;
      description: string;
      mediaUrl?: string;
      mediaType?: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    }
  ): Promise<Post> {
    return this.create({
      title: data.title,
      description: data.description,
      mediaUrl: data.mediaUrl,
      mediaType: data.mediaType,
      user: { connect: { id: userId } },
    });
  }

  // Get post with details
  async getPostWithDetails(postId: string) {
    const post = await this.postRepo.findWithDetails(postId);
    if (!post) {
      throw new NotFoundException(this.resourceName, postId);
    }
    return post;
  }

  // Get posts by user
  async getByUser(userId: string): Promise<Post[]> {
    return this.postRepo.findByUser(userId);
  }

  // Get user feed
  async getFeed(userId: string): Promise<Post[]> {
    return this.postRepo.findFeed(userId);
  }

  // Paginate posts
  async paginate(
    page: number,
    limit: number,
    options?: {
      where?: Prisma.PostWhereInput;
      include?: Prisma.PostInclude;
      orderBy?: any;
    }
  ) {
    return this.postRepo.paginateWithDetails(page, limit, options?.where);
  }

  // Toggle like
  async toggleLike(userId: string, postId: string) {
    await this.getById(postId); // Verify post exists

    const existingLike = await this.postRepo.findLike(userId, postId);

    if (existingLike) {
      await this.postRepo.deleteLike(existingLike.id);
      return { liked: false };
    }

    await this.postRepo.createLike(userId, postId);
    return { liked: true };
  }

  // Share post
  async sharePost(userId: string, postId: string) {
    await this.getById(postId); // Verify post exists
    await this.postRepo.createShare(userId, postId);
    return { shared: true };
  }

  // Add comment
  async addComment(userId: string, postId: string, content: string) {
    if (!content || content.trim().length === 0) {
      throw new Error('Comment content cannot be empty');
    }

    await this.getById(postId); // Verify post exists
    return this.postRepo.createComment(userId, postId, content);
  }

  // Delete comment

  async deleteComment(commentId: string, userId: string) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment', commentId);
    }

    if (comment.userId !== userId) {
      throw new Error('Unauthorized to delete this comment');
    }

    return this.postRepo.deleteComment(commentId);
  }
  // Get comments
  async getComments(postId: string) {
    await this.getById(postId);
    return this.postRepo.getComments(postId);
  }

  // Update post (only by owner)
  async updatePost(
    postId: string,
    userId: string,
    data: Prisma.PostUpdateInput
  ) {
    const post = await this.getById(postId);

    if (post.userId !== userId) {
      throw new Error('Unauthorized to update this post');
    }

    return this.update(postId, data);
  }

  // Delete post (only by owner)
  async deletePost(postId: string, userId: string) {
    const post = await this.getById(postId);

    if (post.userId !== userId) {
      throw new Error('Unauthorized to delete this post');
    }

    return this.delete(postId); // Soft delete
  }
}
