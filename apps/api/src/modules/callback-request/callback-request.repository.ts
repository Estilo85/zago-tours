import { CallbackRequest, Prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';
import { prisma } from '@zagotours/database';

export class CallbackRequestRepository extends BaseRepository<
  CallbackRequest,
  Prisma.CallbackRequestWhereInput,
  Prisma.CallbackRequestCreateInput,
  Prisma.CallbackRequestUpdateInput
  // Prisma.CallbackRequestInclude
> {
  protected readonly modelDelegate = prisma.callbackRequest;

  // Get requests by date range
  async findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<CallbackRequest[]> {
    return this.findAll({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get pending requests (for admin dashboard)
  async findPending(): Promise<CallbackRequest[]> {
    return this.findAll({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
