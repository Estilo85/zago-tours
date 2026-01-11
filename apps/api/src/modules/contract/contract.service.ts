import { Contract, Prisma, ContractStatus } from '@zagotours/database';
import {
  BaseService,
  NotFoundException,
} from 'src/common/service/base.service';
import { ContractRepository } from './contract.repository';

export class ContractService extends BaseService<
  Contract,
  Prisma.ContractWhereInput,
  Prisma.ContractCreateInput,
  Prisma.ContractUpdateInput,
  Prisma.ContractInclude
> {
  protected readonly resourceName = 'Contract';

  constructor(private readonly contractRepo: ContractRepository) {
    super(contractRepo);
  }

  // Create contract
  async createContract(data: {
    userId: string;
    agreement: string;
    documentUrl: string;
  }): Promise<Contract> {
    return this.create({
      user: { connect: { id: data.userId } },
      agreement: data.agreement,
      documentUrl: data.documentUrl,
      status: ContractStatus.NOT_SIGNED,
    });
  }

  // Sign contract
  async signContract(contractId: string, userId: string): Promise<Contract> {
    const contract = await this.getById(contractId);

    // Verify ownership
    if (contract.userId !== userId) {
      throw new Error('Unauthorized to sign this contract');
    }

    // Check if already signed
    if (contract.status === ContractStatus.SIGNED) {
      throw new Error('Contract is already signed');
    }

    // Update contract
    const signed = await this.update(contractId, {
      status: ContractStatus.SIGNED,
      signedAt: new Date(),
    });

    // TODO: Send confirmation email
    // TODO: Generate final signed PDF
    // TODO: Store in secure location

    return signed;
  }

  // Get contracts by user
  async getByUser(userId: string): Promise<Contract[]> {
    return this.contractRepo.findByUser(userId);
  }

  // Get pending contracts
  async getPending(): Promise<Contract[]> {
    return this.contractRepo.findPending();
  }

  // Get by status
  async getByStatus(status: ContractStatus): Promise<Contract[]> {
    return this.contractRepo.findByStatus(status);
  }

  // Paginate contracts
  async paginate(
    page: number,
    limit: number,
    filters?: Prisma.ContractWhereInput
  ) {
    return this.contractRepo.paginateWithDetails(page, limit, filters);
  }
}
