import { DestinationCountry } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';

export class DestinationCountryRepository extends BaseRepository<DestinationCountry> {
  constructor() {
    super('destinationCountry');
  }

  async findActive() {
    return this.model.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findByCode(code: string) {
    return this.model.findFirst({
      where: { code },
    });
  }

  async toggleActive(id: string, isActive: boolean) {
    return this.model.update({
      where: { id },
      data: { isActive },
    });
  }
}
