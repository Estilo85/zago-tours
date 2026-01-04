import { BaseService } from '../../common/service/base.service';
import { adventureRepository } from './adventures.repository';
import {
  Adventure,
  AdventureLevel,
  AdventureStatus,
} from '@zagotours/database';

class AdventureService extends BaseService<Adventure> {
  constructor() {
    super(adventureRepository);
  }

  async getAdventureWithDetails(id: string) {
    const adventure = await adventureRepository.findWithDetails(id);
    if (!adventure) {
      throw new Error('Adventure not found');
    }
    return adventure;
  }

  async getFeaturedAdventures() {
    return adventureRepository.findFeatured();
  }

  async searchAdventures(filters: {
    location?: string;
    level?: AdventureLevel;
    tripType?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 20, ...searchFilters } = filters;

    const adventures = await adventureRepository.findByFilters(searchFilters);

    // Pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = adventures.slice(start, end);

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: adventures.length,
        totalPages: Math.ceil(adventures.length / limit),
      },
    };
  }

  async toggleLike(userId: string, adventureId: string) {
    await this.getById(adventureId); // Check if adventure exists
    return adventureRepository.toggleLike(userId, adventureId);
  }

  async getUserLikedAdventures(userId: string) {
    return adventureRepository.getUserLikes(userId);
  }

  async verifyAdventure(id: string) {
    await this.getById(id);
    return adventureRepository.verifyAdventure(id);
  }

  async updateSafetyScore(id: string, safetyScore: number) {
    await this.getById(id);
    return adventureRepository.updateSafetyScore(id, safetyScore);
  }

  async updateRating(id: string, rating: number) {
    await this.getById(id);
    return adventureRepository.updateRating(id, rating);
  }
}

export const adventureService = new AdventureService();
