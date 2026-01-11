import { BaseService } from 'src/common/service/base.service';
import { DestinationCountryRepository } from './destination-country.repository';
import { DestinationCountry } from '@zagotours/database';

export class DestinationCountryService extends BaseService<DestinationCountry> {
  constructor(private countryRepository: DestinationCountryRepository) {
    super(countryRepository);
  }

  async getActiveCountries() {
    return this.countryRepository.findActive();
  }

  async getAllCountries() {
    return this.countryRepository.findAll({
      orderBy: { name: 'asc' },
    });
  }

  async getByCode(code: string) {
    const country = await this.countryRepository.findByCode(code);
    if (!country) throw new Error('Country not found');
    return country;
  }

  async createCountry(data: any) {
    return this.countryRepository.create(data);
  }

  async updateCountry(id: string, data: any) {
    await this.getById(id);
    return this.countryRepository.update(id, data);
  }

  async toggleActive(id: string, isActive: boolean) {
    await this.getById(id);
    return this.countryRepository.toggleActive(id, isActive);
  }

  async deleteCountry(id: string) {
    return this.countryRepository.delete(id);
  }
}
