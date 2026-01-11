import { Contract, Prisma, ContractStatus } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';
import { prisma } from '@zagotours/database';

export class ContractRepository extends BaseRepository<
  Contract,
  Prisma.ContractWhereInput,
  Prisma.ContractCreateInput,
  Prisma.ContractUpdateInput,
  Prisma.ContractInclude
> {
  protected readonly modelDelegate = prisma.contract;

  private readonly standardInclude: Prisma.ContractInclude = {
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
  };

  // Get contracts by user
  async findByUser(userId: string): Promise<Contract[]> {
    return this.findAll({
      where: { userId },
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get contracts by status
  async findByStatus(status: ContractStatus): Promise<Contract[]> {
    return this.findAll({
      where: { status },
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get pending contracts (not signed)
  async findPending(): Promise<Contract[]> {
    return this.findAll({
      where: { status: ContractStatus.NOT_SIGNED },
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Paginate with details
  async paginateWithDetails(
    page: number,
    limit: number,
    filters?: Prisma.ContractWhereInput
  ) {
    return this.paginate({
      page,
      limit,
      where: filters,
      include: this.standardInclude,
      orderBy: { createdAt: 'desc' },
    });
  }
}
