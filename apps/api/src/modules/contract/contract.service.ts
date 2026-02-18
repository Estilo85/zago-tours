import { Contract, Prisma, ContractStatus } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { ContractRepository } from './contract.repository';
import { EmailService } from 'src/shared/services/email.service';

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
    publicId: string;
  }): Promise<Contract> {
    const contract = await this.create({
      user: { connect: { id: data.userId } },
      agreement: data.agreement,
      documentUrl: data.documentUrl,
      publicId: data.publicId,
      status: ContractStatus.NOT_SIGNED,
    });

    // Send notification email to user
    const user = (await this.contractRepo.findById(contract.id, {
      user: true,
    })) as Contract & { user: { email: string; name: string } };

    if (user) {
      await EmailService.sendContractNotification(
        user.user.email,
        user.user.name,
        data.documentUrl,
      );
    }

    return contract;
  }

  async signContract(contractId: string, userId: string): Promise<Contract> {
    const contract = await this.getById(contractId, {
      user: true,
    });

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

    // Fetch complete contract with user data for emails
    const completeContract = (await this.getById(contractId, {
      user: true,
    })) as any;

    // Send confirmation email to user
    await EmailService.sendContractSignedConfirmation(
      completeContract.user.email,
      completeContract.user.name,
      completeContract.documentUrl,
    );

    // Send notification to admin
    await EmailService.sendContractSignedNotification({
      userEmail: completeContract.user.email,
      userName: completeContract.user.name,
      contractId: completeContract.id,
      signedAt: completeContract.signedAt!,
      agreement: completeContract.agreement,
    });

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
    filters?: {
      where?: Prisma.ContractWhereInput;
      include?: Prisma.ContractInclude;
      orderBy?: any;
    },
  ) {
    return this.contractRepo.paginateWithDetails(page, limit, filters?.where);
  }
}
