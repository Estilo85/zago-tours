import { DestinationCountry, Prisma } from '@zagotours/database';
import {
  BaseService,
  NotFoundException,
} from 'src/common/service/base.service';
import { DestinationCountryRepository } from './destination-country.repository';

export class DestinationCountryService extends BaseService<
  DestinationCountry,
  Prisma.DestinationCountryWhereInput,
  Prisma.DestinationCountryCreateInput,
  Prisma.DestinationCountryUpdateInput
  // Prisma.DestinationCountryInclude
> {
  protected readonly resourceName = 'DestinationCountry';

  constructor(private readonly countryRepo: DestinationCountryRepository) {
    super(countryRepo);
  }

  async getActiveCountries() {
    return this.countryRepo.findActive();
  }

  async getAllCountries() {
    return this.getAll({
      orderBy: { name: 'asc' },
    });
  }

  async getByCode(code: string) {
    const country = await this.countryRepo.findByCode(code);
    if (!country) {
      throw new NotFoundException(this.resourceName, `code: ${code}`);
    }
    return country;
  }

  async toggleActive(id: string, isActive: boolean) {
    await this.getById(id); // Verify exists
    return this.countryRepo.toggleActive(id, isActive);
  }
}
