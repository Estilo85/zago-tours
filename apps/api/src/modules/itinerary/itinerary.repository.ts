import { Itinerary, Prisma, prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';

export class ItineraryRepository extends BaseRepository<
  Itinerary,
  Prisma.ItineraryWhereInput,
  Prisma.ItineraryCreateInput,
  Prisma.ItineraryUpdateInput,
  Prisma.ItineraryInclude
> {
  protected readonly modelDelegate = prisma.itinerary;

  async createMany(data: Prisma.ItineraryCreateManyInput[]) {
    return this.modelDelegate.createMany({ data, skipDuplicates: true });
  }

  async findByAdventure(adventureId: string): Promise<Itinerary[]> {
    return this.modelDelegate.findMany({
      where: { adventureId },
      orderBy: { dayNumber: 'asc' },
    });
  }

  async deleteByAdventure(adventureId: string) {
    return this.modelDelegate.deleteMany({ where: { adventureId } });
  }

  async updateWithImageCleanup(
    id: string,
    data: Prisma.ItineraryUpdateInput,
    oldPublicId?: string
  ): Promise<Itinerary> {
    // This allows atomic update with old image cleanup
    return this.modelDelegate.update({ where: { id }, data });
  }
}
