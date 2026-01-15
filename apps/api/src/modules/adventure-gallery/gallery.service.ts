import { AdventureGallery, Prisma } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { AdventureGalleryRepository } from './gallery.repository';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';
import { BulkUploadGalleryDto, ReorderGalleryDto } from '@zagotours/types';

export class AdventureGalleryService extends BaseService<
  AdventureGallery,
  Prisma.AdventureGalleryWhereInput,
  Prisma.AdventureGalleryCreateInput,
  Prisma.AdventureGalleryUpdateInput,
  Prisma.AdventureGalleryInclude
> {
  protected readonly resourceName = 'gallery item';

  constructor(private readonly galleryRepo: AdventureGalleryRepository) {
    super(galleryRepo);
  }

  async bulkUpload(dto: BulkUploadGalleryDto) {
    const items = await Promise.all(
      dto.media.map(async (item, index) => {
        const order = await this.galleryRepo.getNextOrder(dto.adventureId);
        return {
          ...item,
          adventureId: dto.adventureId,
          order: order + index,
        };
      })
    );

    const result = await this.galleryRepo.createMany(items);
    return {
      count: result.count,
      message: `Uploaded ${result.count} media items`,
    };
  }

  async reorder(dto: ReorderGalleryDto) {
    await Promise.all(
      dto.items.map((item) => this.galleryRepo.updateOrder(item.id, item.order))
    );
    return { message: 'Gallery reordered successfully' };
  }

  async getByAdventure(adventureId: string): Promise<AdventureGallery[]> {
    return this.galleryRepo.findByAdventure(adventureId);
  }

  async deleteWithMedia(id: string): Promise<void> {
    const item = await this.getById(id);

    // Delete from Cloudinary
    if (item.publicId) {
      await CloudinaryService.deleteFile(item.publicId);
    }

    await this.galleryRepo.softDelete(id);
  }
}
