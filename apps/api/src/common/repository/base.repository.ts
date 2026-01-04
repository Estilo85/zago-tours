import { PrismaClient, prisma } from '@zagotours/database';

export abstract class BaseRepository<T> {
  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  // Get model delegate dynamically
  protected get model() {
    return (this.prisma as any)[this.modelName];
  }

  // ==================== BASIC CRUD ====================

  async findById(id: string, include?: any) {
    return this.model.findUnique({
      where: { id },
      ...(include && { include }),
    });
  }

  async findAll(options?: {
    where?: any;
    include?: any;
    orderBy?: any;
    skip?: number;
    take?: number;
  }) {
    return this.model.findMany(options);
  }

  async findOne(where: any, include?: any) {
    return this.model.findFirst({
      where,
      ...(include && { include }),
    });
  }

  async create(data: any, include?: any) {
    return this.model.create({
      data,
      ...(include && { include }),
    });
  }

  async createMany(data: any[]) {
    return this.model.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async update(id: string, data: any, include?: any) {
    return this.model.update({
      where: { id },
      data,
      ...(include && { include }),
    });
  }

  async updateMany(where: any, data: any) {
    return this.model.updateMany({
      where,
      data,
    });
  }

  async delete(id: string) {
    return this.model.delete({
      where: { id },
    });
  }

  async deleteMany(where: any) {
    return this.model.deleteMany({
      where,
    });
  }

  // ==================== SOFT DELETE ====================

  async softDelete(id: string) {
    return this.model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.model.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findAllActive(options?: {
    where?: any;
    include?: any;
    orderBy?: any;
    skip?: number;
    take?: number;
  }) {
    return this.model.findMany({
      ...options,
      where: {
        ...options?.where,
        deletedAt: null,
      },
    });
  }

  // ==================== PAGINATION ====================

  async paginate(options: {
    page: number;
    limit: number;
    where?: any;
    include?: any;
    orderBy?: any;
  }) {
    const { page, limit, where, include, orderBy } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.model.findMany({
        where,
        include,
        orderBy,
        skip,
        take: limit,
      }),
      this.model.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  // ==================== UTILITY ====================

  async count(where?: any) {
    return this.model.count({ where });
  }

  async exists(where: any): Promise<boolean> {
    const count = await this.model.count({ where });
    return count > 0;
  }

  async upsert(where: any, create: any, update: any) {
    return this.model.upsert({
      where,
      create,
      update,
    });
  }

  // ==================== TRANSACTIONS ====================
  async transaction<R>(
    callback: (
      tx: Omit<
        PrismaClient,
        | '$connect'
        | '$disconnect'
        | '$on'
        | '$transaction'
        | '$use'
        | '$extends'
      >
    ) => Promise<R>
  ): Promise<R> {
    return this.prisma.$transaction(callback);
  }
}
