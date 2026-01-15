import { Itinerary, Prisma } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { ItineraryRepository } from './itinerary.repository';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';
import {
  CreateItineraryDto,
  UpdateItineraryDto,
  BulkCreateItinerariesDto,
} from '@zagotours/types';

export class ItineraryService extends BaseService<
  Itinerary,
  Prisma.ItineraryWhereInput,
  Prisma.ItineraryCreateInput,
  Prisma.ItineraryUpdateInput,
  Prisma.ItineraryInclude
> {
  protected readonly resourceName = 'itinerary';

  constructor(private readonly itineraryRepo: ItineraryRepository) {
    super(itineraryRepo);
  }

  async createBulk(dto: BulkCreateItinerariesDto) {
    const itineraries = dto.itineraries.map((item) => ({
      ...item,
      adventureId: dto.adventureId,
    }));

    const result = await this.itineraryRepo.createMany(itineraries);
    return {
      count: result.count,
      message: `Created ${result.count} itineraries`,
    };
  }

  async getByAdventure(adventureId: string): Promise<Itinerary[]> {
    return this.itineraryRepo.findByAdventure(adventureId);
  }

  async updateWithImage(
    id: string,
    dto: UpdateItineraryDto,
    file?: Express.Multer.File
  ): Promise<Itinerary> {
    const existing = await this.getById(id);
    const updateData: Prisma.ItineraryUpdateInput = { ...dto };

    // Handle image upload
    if (file) {
      // Delete old image if exists
      if (existing.publicId) {
        await CloudinaryService.deleteFile(existing.publicId);
      }

      const uploadResult = await CloudinaryService.uploadFile(
        file,
        'itinerary'
      );
      updateData.imageUrl = uploadResult.url;
      updateData.publicId = uploadResult.publicId;
    }

    return this.itineraryRepo.update(id, updateData);
  }

  async deleteWithImage(id: string): Promise<void> {
    const itinerary = await this.getById(id);

    // Delete Cloudinary image if exists
    if (itinerary.publicId) {
      await CloudinaryService.deleteFile(itinerary.publicId);
    }

    await this.itineraryRepo.delete(id);
  }
}
