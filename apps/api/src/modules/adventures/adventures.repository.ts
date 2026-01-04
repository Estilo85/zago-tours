import { BaseRepository } from '../../common/repository/base.repository';
import {
  Adventure,
  AdventureStatus,
  AdventureLevel,
  AccessType,
} from '@zagotours/database';

export class AdventureRepository extends BaseRepository<Adventure> {
  constructor() {
    super('adventure');
  }

  // ==================== CUSTOM QUERIES ====================

  async findWithDetails(id: string) {
    return this.model.findUnique({
      where: { id },
      include: {
        itineraries: {
          orderBy: { dayNumber: 'asc' },
        },
        gallery: true,
        likes: true,
        _count: {
          select: { likes: true },
        },
      },
    });
  }

  async findFeatured() {
    return this.model.findMany({
      where: {
        status: AdventureStatus.ACTIVE,
        isVerified: true,
        deletedAt: null,
      },
      orderBy: {
        rating: 'desc',
      },
      take: 10,
      include: {
        _count: {
          select: { likes: true },
        },
      },
    });
  }

  async findByFilters(filters: {
    location?: string;
    level?: AdventureLevel;
    tripType?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: AdventureStatus;
    access?: AccessType;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = { deletedAt: null };

    if (filters.location) {
      where.location = { contains: filters.location, mode: 'insensitive' };
    }
    if (filters.level) where.level = filters.level;
    if (filters.tripType) where.tripType = filters.tripType;
    if (filters.status) where.status = filters.status;
    if (filters.access) where.access = filters.access;

    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = filters.minPrice;
      if (filters.maxPrice) where.price.lte = filters.maxPrice;
    }

    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = filters.startDate;
      if (filters.endDate) where.date.lte = filters.endDate;
    }

    return this.model.findMany({
      where,
      include: {
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateRating(id: string, rating: number) {
    return this.model.update({
      where: { id },
      data: { rating },
    });
  }

  async updateSafetyScore(id: string, safetyScore: number) {
    return this.model.update({
      where: { id },
      data: { safetyScore },
    });
  }

  async verifyAdventure(id: string) {
    return this.model.update({
      where: { id },
      data: { isVerified: true },
    });
  }

  async toggleLike(userId: string, adventureId: string) {
    const existing = await this.prisma.adventureLike.findUnique({
      where: {
        userId_adventureId: { userId, adventureId },
      },
    });

    if (existing) {
      await this.prisma.adventureLike.delete({
        where: { id: existing.id },
      });
      return { liked: false };
    } else {
      await this.prisma.adventureLike.create({
        data: { userId, adventureId },
      });
      return { liked: true };
    }
  }

  async getUserLikes(userId: string) {
    return this.prisma.adventureLike.findMany({
      where: { userId },
      include: {
        adventure: true,
      },
    });
  }
}

export const adventureRepository = new AdventureRepository();
