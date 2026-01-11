import { TripRequest, Prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';
import { prisma } from '@zagotours/database';

export class TripRequestRepository extends BaseRepository<
  TripRequest,
  Prisma.TripRequestWhereInput,
  Prisma.TripRequestCreateInput,
  Prisma.TripRequestUpdateInput
> {
  protected readonly modelDelegate = prisma.tripRequest;

  // Get requests by trip type
  async findByTripType(tripType: string): Promise<TripRequest[]> {
    return this.findAll({
      where: { tripType },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get requests by destination
  async findByDestination(destination: string): Promise<TripRequest[]> {
    return this.findAll({
      where: {
        destination: {
          contains: destination,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get requests by date range
  async findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<TripRequest[]> {
    return this.findAll({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  // Get recent requests (last 7 days)
  async findRecent(): Promise<TripRequest[]> {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return this.findAll({
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
