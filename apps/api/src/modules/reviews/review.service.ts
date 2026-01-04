import { BaseService } from '../../common/service/base.service';
import { reviewRepository } from './review.repository';
import { Review } from '@zagotours/database';

class ReviewService extends BaseService<Review> {
  constructor() {
    super(reviewRepository);
  }

  async getFeaturedReviews() {
    return reviewRepository.findFeatured();
  }

  async getUserReviews(userId: string) {
    return reviewRepository.findByUser(userId);
  }

  async toggleFeature(id: string) {
    await this.getById(id);
    return reviewRepository.toggleFeature(id);
  }

  async getAverageRating() {
    return reviewRepository.getAverageRating();
  }
}

export const reviewService = new ReviewService();
