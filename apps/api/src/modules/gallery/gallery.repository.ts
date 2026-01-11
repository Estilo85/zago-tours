import { Gallery, Prisma, MediaType } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';
import { prisma } from '@zagotours/database';

export class GalleryRepository extends BaseRepository<
  Gallery,
  Prisma.GalleryWhereInput,
  Prisma.GalleryCreateInput,
  Prisma.GalleryUpdateInput,
  Prisma.GalleryInclude
> {
  protected readonly modelDelegate = prisma.gallery;

  private readonly standardInclude: Prisma.GalleryInclude = {
    user: {
      select: {
        id: true,
        name: true,
      },
    },
    adventure: {
      select: {
        id: true,
        title: true,
      },
    },
  };

  // Get gallery by adventure
  async findByAdventure(adventureId: string): Promise<Gallery[]> {
    return this.findAll({
      where: { adventureId, deletedAt: null },
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get gallery by user
  async findByUser(userId: string): Promise<Gallery[]> {
    return this.findAll({
      where: { uploadedBy: userId, deletedAt: null },
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get gallery by media type
  async findByMediaType(mediaType: MediaType): Promise<Gallery[]> {
    return this.findAll({
      where: { mediaType, deletedAt: null },
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Paginate with details
  async paginateWithDetails(
    page: number,
    limit: number,
    filters?: Prisma.GalleryWhereInput
  ) {
    return this.paginate({
      page,
      limit,
      where: { deletedAt: null, ...filters },
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }
}
