import { GeneralInquiry, Prisma } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { GeneralInquiryRepository } from './general-inquiry.repository';
import { GeneralInquiryListQueryDto } from '@zagotours/types';

export class GeneralInquiryService extends BaseService<
  GeneralInquiry,
  Prisma.GeneralInquiryWhereInput,
  Prisma.GeneralInquiryCreateInput,
  Prisma.GeneralInquiryUpdateInput
> {
  protected readonly resourceName = 'GeneralInquiry';

  constructor(private readonly inquiryRepo: GeneralInquiryRepository) {
    super(inquiryRepo);
  }

  // Create a new inquiry
  override async create(
    data: Prisma.GeneralInquiryCreateInput
  ): Promise<GeneralInquiry> {
    const inquiry = await super.create(data);
    // TODO: Send email notification to admin
    return inquiry;
  }

  async getAllInquiries(query: GeneralInquiryListQueryDto): Promise<{
    data: GeneralInquiry[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const where: Prisma.GeneralInquiryWhereInput = {};

    // Apply search filter
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    const result: any = await this.paginate(page, limit, {
      where,
      orderBy: { [sortBy]: sortOrder },
    });

    return {
      data: result.items ?? result.data ?? [],
      total: (result.meta && result.meta.total) ?? result.total ?? 0,
      page: (result.meta && result.meta.page) ?? result.page ?? page,
      limit: (result.meta && result.meta.limit) ?? result.limit ?? limit,
    };
  }

  // Get recent inquiries
  async getRecent(): Promise<GeneralInquiry[]> {
    return this.inquiryRepo.findRecent();
  }

  // Get inquiry by ID
  async getById(id: string): Promise<GeneralInquiry> {
    return super.getById(id);
  }

  // Delete inquiry by ID
  async deleteInquiry(id: string): Promise<void> {
    await super.delete(id, true);
  }

  // Search inquiries
  async searchInquiries(searchTerm: string): Promise<GeneralInquiry[]> {
    return this.inquiryRepo.search(searchTerm);
  }
}
