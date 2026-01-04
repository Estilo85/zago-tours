import { BaseRepository } from '../../common/repository/base.repository';
import { Review } from '@zagotours/database';

export class ReviewRepository extends BaseRepository<Review> {
  constructor() {
    super('review');
  }

  async findFeatured() {
    return this.model.findMany({
      where: { isFeatured: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUser(userId: string) {
    return this.model.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async toggleFeature(id: string) {
    const review = await this.model.findUnique({
      where: { id },
    });

    return this.model.update({
      where: { id },
      data: { isFeatured: !review?.isFeatured },
    });
  }

  async getAverageRating() {
    const result = await this.model.aggregate({
      _avg: { rating: true },
      _count: true,
    });

    return {
      averageRating: result._avg.rating || 0,
      totalReviews: result._count,
    };
  }
}

export const reviewRepository = new ReviewRepository();
