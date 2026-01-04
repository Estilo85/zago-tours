import { BaseRepository } from '../repository/base.repository';

export abstract class BaseService<T> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async getById(id: string) {
    const item = await this.repository.findById(id);
    if (!item) {
      throw new Error(`${this.repository['modelName']} not found`);
    }
    return item;
  }

  async getAll(options?: any) {
    return this.repository.findAll(options);
  }

  async create(data: any) {
    return this.repository.create(data);
  }

  async update(id: string, data: any) {
    await this.getById(id); // Check if exists
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.getById(id); // Check if exists
    return this.repository.softDelete(id);
  }

  async hardDelete(id: string) {
    await this.getById(id); // Check if exists
    return this.repository.delete(id);
  }

  async paginate(page: number, limit: number, options?: any) {
    return this.repository.paginate({
      page,
      limit,
      ...options,
    });
  }
}
