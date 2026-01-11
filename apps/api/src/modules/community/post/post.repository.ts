import { Post, Prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';
import { prisma } from '@zagotours/database';

export class PostRepository extends BaseRepository<
  Post,
  Prisma.PostWhereInput,
  Prisma.PostCreateInput,
  Prisma.PostUpdateInput,
  Prisma.PostInclude
> {
  protected readonly modelDelegate = prisma.post;

  private readonly standardInclude: Prisma.PostInclude = {
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
    _count: {
      select: {
        comments: true,
        likes: true,
        shares: true,
      },
    },
  };

  // Get posts with full details (including comments)
  async findWithDetails(postId: string) {
    return this.findById(postId, {
      ...this.standardInclude,
      comments: {
        include: {
          user: {
            select: { id: true, name: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      likes: {
        include: {
          user: {
            select: { id: true, name: true },
          },
        },
      },
    });
  }

  // Get posts by user
  async findByUser(userId: string): Promise<Post[]> {
    return this.findAll({
      where: { userId, deletedAt: null },
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get user's feed (own posts + followed users - simplified version)
  async findFeed(userId: string): Promise<Post[]> {
    return this.findAll({
      where: { deletedAt: null },
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Paginate with details
  async paginateWithDetails(
    page: number,
    limit: number,
    filters?: Prisma.PostWhereInput
  ) {
    return this.paginate({
      page,
      limit,
      where: { deletedAt: null, ...filters },
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Like operations
  async findLike(userId: string, postId: string) {
    return prisma.like.findFirst({
      where: { userId, postId },
    });
  }

  async createLike(userId: string, postId: string) {
    return prisma.like.create({
      data: { userId, postId },
    });
  }

  async deleteLike(likeId: string) {
    return prisma.like.delete({
      where: { id: likeId },
    });
  }

  // Share operations
  async createShare(userId: string, postId: string) {
    return prisma.share.create({
      data: { userId, postId },
    });
  }

  async getShareCount(postId: string): Promise<number> {
    return prisma.share.count({
      where: { postId },
    });
  }

  // Comment operations
  async createComment(userId: string, postId: string, content: string) {
    return prisma.comment.create({
      data: { userId, postId, content },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
    });
  }

  async deleteComment(commentId: string) {
    return prisma.comment.update({
      where: { id: commentId },
      data: { deletedAt: new Date() },
    });
  }

  async getComments(postId: string) {
    return prisma.comment.findMany({
      where: { postId, deletedAt: null },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
