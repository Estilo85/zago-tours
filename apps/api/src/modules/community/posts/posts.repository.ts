import { BaseRepository } from '../../../common/repository/base.repository';
import { Post } from '@zagotours/database';

export class PostRepository extends BaseRepository<Post> {
  constructor() {
    super('post');
  }

  async findWithDetails(id: string) {
    return this.model.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          include: {
            user: {
              select: { id: true, name: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        likes: true,
        shares: true,
        _count: {
          select: {
            comments: true,
            likes: true,
            shares: true,
          },
        },
      },
    });
  }

  async getFeed(options: { page: number; limit: number; userId?: string }) {
    const skip = (options.page - 1) * options.limit;

    return this.model.findMany({
      where: { deletedAt: null },
      include: {
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
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: options.limit,
    });
  }

  async toggleLike(userId: string, postId: string) {
    const existing = await this.prisma.like.findFirst({
      where: { userId, postId },
    });

    if (existing) {
      await this.prisma.like.delete({
        where: { id: existing.id },
      });
      return { liked: false };
    } else {
      await this.prisma.like.create({
        data: { userId, postId },
      });
      return { liked: true };
    }
  }

  async sharePost(userId: string, postId: string) {
    return this.prisma.share.create({
      data: { userId, postId },
    });
  }
}

export const postRepository = new PostRepository();
