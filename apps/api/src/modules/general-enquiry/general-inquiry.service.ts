import { GeneralInquiry, Prisma } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { GeneralInquiryRepository } from './general-inquiry.repository';

export class GeneralInquiryService extends BaseService<
  GeneralInquiry,
  Prisma.GeneralInquiryWhereInput,
  Prisma.GeneralInquiryCreateInput,
  Prisma.GeneralInquiryUpdateInput
  // Prisma.GeneralInquiryInclude
> {
  protected readonly resourceName = 'GeneralInquiry';

  constructor(private readonly inquiryRepo: GeneralInquiryRepository) {
    super(inquiryRepo);
  }

  // Create inquiry with notification
  override async create(
    data: Prisma.GeneralInquiryCreateInput
  ): Promise<GeneralInquiry> {
    const inquiry = await super.create(data);

    // TODO: Send email notification to admin

    return inquiry;
  }

  // Get recent inquiries
  async getRecent(): Promise<GeneralInquiry[]> {
    return this.inquiryRepo.findRecent();
  }
}
