import { Gallery, Prisma, MediaType } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { GalleryRepository } from './gallery.repository';
import { PaginationResult } from '@zagotours/types';

export class GalleryService extends BaseService<
  Gallery,
  Prisma.GalleryWhereInput,
  Prisma.GalleryCreateInput,
  Prisma.GalleryUpdateInput,
  Prisma.GalleryInclude
> {
  protected readonly resourceName = 'Gallery';

  constructor(private readonly galleryRepo: GalleryRepository) {
    super(galleryRepo);
  }

  // Upload media
  async uploadMedia(data: {
    userId: string;
    mediaUrl: string;
    mediaType: MediaType;
    altText?: string;
    adventureId?: string;
  }): Promise<Gallery> {
    return this.create({
      mediaUrl: data.mediaUrl,
      mediaType: data.mediaType,
      altText: data.altText,
      user: { connect: { id: data.userId } },
      ...(data.adventureId && {
        adventure: { connect: { id: data.adventureId } },
      }),
    });
  }

  // Get by adventure
  async getByAdventure(adventureId: string): Promise<Gallery[]> {
    return this.galleryRepo.findByAdventure(adventureId);
  }

  // Get by user
  async getByUser(userId: string): Promise<Gallery[]> {
    return this.galleryRepo.findByUser(userId);
  }

  // Get by media type
  async getByMediaType(mediaType: MediaType): Promise<Gallery[]> {
    return this.galleryRepo.findByMediaType(mediaType);
  }

  // Paginate gallery
  async paginate(
    page: number,
    limit: number,
    options?: {
      where?: Prisma.GalleryWhereInput;
      include?: Prisma.GalleryInclude;
      orderBy?: any;
    }
  ): Promise<PaginationResult<Gallery>> {
    return this.galleryRepo.paginateWithDetails(page, limit, options?.where);
  }
}
