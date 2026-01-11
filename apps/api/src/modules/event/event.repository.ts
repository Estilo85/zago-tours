import { Event, Prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';
import { prisma } from '@zagotours/database';

export class EventRepository extends BaseRepository<
  Event,
  Prisma.EventWhereInput,
  Prisma.EventCreateInput,
  Prisma.EventUpdateInput
> {
  protected readonly modelDelegate = prisma.event;

  async findUpcoming(): Promise<Event[]> {
    return this.findAll({
      where: {
        deletedAt: null,
        date: { gte: new Date() },
      },
      orderBy: { date: 'asc' },
    });
  }

  async findByLocation(location: string): Promise<Event[]> {
    return this.findAll({
      where: {
        deletedAt: null,
        location: { contains: location, mode: 'insensitive' },
      },
      orderBy: { date: 'asc' },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
    return this.findAll({
      where: {
        deletedAt: null,
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: 'asc' },
    });
  }
}
