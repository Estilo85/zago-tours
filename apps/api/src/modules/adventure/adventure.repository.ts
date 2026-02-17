import { Adventure, Prisma, prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';

export class AdventureRepository extends BaseRepository<
  Adventure,
  Prisma.AdventureWhereInput,
  Prisma.AdventureCreateInput,
  Prisma.AdventureUpdateInput,
  Prisma.AdventureInclude
> {
  protected readonly modelDelegate = prisma.adventure;

  private readonly standardInclude: Prisma.AdventureInclude = {
    itineraries: { orderBy: { dayNumber: 'asc' } },
    gallery: { orderBy: { order: 'asc' } },
    likes: {
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    },
    _count: {
      select: {
        likes: true,
        itineraries: true,
        gallery: true,
      },
    },
  };

  async create(
    data: Prisma.AdventureCreateInput,
    include?: Prisma.AdventureInclude,
  ): Promise<Adventure> {
    return this.modelDelegate.create({
      data,
      include: include || this.standardInclude,
    });
  }

  //==================
  //
  //==================
  async createMany(data: Prisma.AdventureCreateManyInput[]) {
    return this.modelDelegate.createMany({ data, skipDuplicates: true });
  }

  async update(
    id: string,
    data: Prisma.AdventureUpdateInput,
    include?: Prisma.AdventureInclude,
  ): Promise<Adventure> {
    return this.modelDelegate.update({
      where: { id },
      data,
      include: include || this.standardInclude,
    });
  }

  async findById(
    id: string,
    include?: Prisma.AdventureInclude,
  ): Promise<Adventure | null> {
    return super.findById(id, include || this.standardInclude);
  }

  async paginate(options: any) {
    return super.paginate({
      ...options,
      include: options.include || this.standardInclude,
      where: { deletedAt: null, ...options.where },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findLike(userId: string, adventureId: string) {
    return prisma.adventureLike.findUnique({
      where: { userId_adventureId: { userId, adventureId } },
    });
  }

  async findLikedIds(
    userId: string,
    adventureIds: string[],
  ): Promise<string[]> {
    const likes = await prisma.adventureLike.findMany({
      where: {
        userId,
        adventureId: { in: adventureIds },
      },
      select: { adventureId: true },
    });
    return likes.map((l) => l.adventureId);
  }

  async createLike(userId: string, adventureId: string) {
    return prisma.adventureLike.create({ data: { userId, adventureId } });
  }

  async getAdventureWithLikers(id: string) {
    return this.modelDelegate.findUnique({
      where: { id },
      include: {
        likes: {
          include: {
            user: { select: { id: true, name: true, image: true } },
          },
        },
      },
    });
  }

  async deleteLike(id: string) {
    return prisma.adventureLike.delete({ where: { id } });
  }
}
