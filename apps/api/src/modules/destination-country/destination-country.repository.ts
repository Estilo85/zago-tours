import { DestinationCountry, Prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';

export class DestinationCountryRepository extends BaseRepository<
  DestinationCountry,
  Prisma.DestinationCountryWhereInput,
  Prisma.DestinationCountryCreateInput,
  Prisma.DestinationCountryUpdateInput
> {
  protected readonly modelDelegate = this.prisma.destinationCountry;

  async createMany(data: Prisma.DestinationCountryCreateInput[]) {
    return this.prisma.destinationCountry.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async findActive() {
    return this.modelDelegate.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findByCode(code: string) {
    return this.modelDelegate.findFirst({
      where: { code },
    });
  }

  async toggleActive(id: string, isActive: boolean) {
    return this.modelDelegate.update({
      where: { id },
      data: { isActive },
    });
  }
}
