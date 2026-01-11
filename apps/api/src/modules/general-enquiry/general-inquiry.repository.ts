import { GeneralInquiry, Prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';
import { prisma } from '@zagotours/database';

export class GeneralInquiryRepository extends BaseRepository<
  GeneralInquiry,
  Prisma.GeneralInquiryWhereInput,
  Prisma.GeneralInquiryCreateInput,
  Prisma.GeneralInquiryUpdateInput
  // Prisma.GeneralInquiryInclude
> {
  protected readonly modelDelegate = prisma.generalInquiry;

  // Get recent inquiries
  async findRecent(): Promise<GeneralInquiry[]> {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return this.findAll({
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
