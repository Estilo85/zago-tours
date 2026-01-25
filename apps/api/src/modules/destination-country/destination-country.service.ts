import { DestinationCountry, Prisma } from '@zagotours/database';
import {
  BaseService,
  NotFoundException,
} from 'src/common/service/base.service';
import { DestinationCountryRepository } from './destination-country.repository';
import { CreateDestinationCountryDto } from '@zagotours/types';

export class DestinationCountryService extends BaseService<
  DestinationCountry,
  Prisma.DestinationCountryWhereInput,
  Prisma.DestinationCountryCreateInput,
  Prisma.DestinationCountryUpdateInput
> {
  protected readonly resourceName = 'DestinationCountry';

  constructor(private readonly countryRepo: DestinationCountryRepository) {
    super(countryRepo);
  }

  async createBulk(countries: CreateDestinationCountryDto[]) {
    // Validate that array is not empty
    if (!countries || countries.length === 0) {
      throw new Error('At least one country is required');
    }

    const codes = countries.map((c) => c.code).filter(Boolean);
    const uniqueCodes = new Set(codes);
    if (codes.length !== uniqueCodes.size) {
      throw new Error('Duplicate country codes in request');
    }

    // Create all countries
    await this.countryRepo.createMany(
      countries.map((country) => ({
        name: country.name,
        code: country.code || null,
        isActive: country.isActive ?? true,
      })),
    );

    // Return all countries (since createMany doesn't return created records)
    return this.getAllCountries();
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
