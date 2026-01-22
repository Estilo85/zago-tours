import { Event, EventRegistration, Prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';
import { prisma } from '@zagotours/database';

export class EventRepository extends BaseRepository<
  Event,
  Prisma.EventWhereInput,
  Prisma.EventCreateInput,
  Prisma.EventUpdateInput
> {
  protected readonly modelDelegate = prisma.event;

  // Event queries
  async findUpcoming(): Promise<Event[]> {
    return this.findAll({
      where: {
        deletedAt: null,
        date: { gte: new Date() },
      },
      orderBy: { date: 'asc' },
      include: {
        registrations: {
          take: 5,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
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

  async findWithAvailableSpots(): Promise<Event[]> {
    return this.findAll({
      where: {
        deletedAt: null,
        spotLeft: { gt: 0 },
        date: { gte: new Date() },
      },
      orderBy: { date: 'asc' },
    });
  }

  // Registration queries
  async findRegistration(userId: string, eventId: string) {
    return prisma.eventRegistration.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });
  }

  async findUserRegistrations(
    userId: string,
    filters?: { status?: string; upcomingOnly?: boolean },
  ): Promise<EventRegistration[]> {
    const where: Prisma.EventRegistrationWhereInput = { userId };

    if (filters?.status) {
      where.status = filters.status as any;
    }

    if (filters?.upcomingOnly) {
      where.event = {
        date: { gte: new Date() },
      };
    }

    return prisma.eventRegistration.findMany({
      where,
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
            mediaUrl: true,
            description: true,
            spotLeft: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async countRegistrations(eventId: string): Promise<number> {
    return prisma.eventRegistration.count({
      where: { eventId },
    });
  }

  // Stats
  async getStats() {
    const now = new Date();

    const [totalEvents, upcomingEvents, pastEvents, popularLocations] =
      await Promise.all([
        this.modelDelegate.count({ where: { deletedAt: null } }),
        this.modelDelegate.count({
          where: { deletedAt: null, date: { gte: now } },
        }),
        this.modelDelegate.count({
          where: { deletedAt: null, date: { lt: now } },
        }),
        prisma.event.groupBy({
          by: ['location'],
          where: { deletedAt: null },
          _count: { id: true },
          orderBy: { _count: { id: 'desc' } },
          take: 5,
        }),
      ]);

    const totalSpotsAvailable = await prisma.event.aggregate({
      where: { deletedAt: null, date: { gte: now } },
      _sum: { spotLeft: true },
    });

    return {
      totalEvents,
      upcomingEvents,
      pastEvents,
      totalSpotsAvailable: totalSpotsAvailable._sum.spotLeft || 0,
      popularLocations: popularLocations.map((loc: any) => ({
        location: loc.location,
        count: loc._count.id,
      })),
    };
  }
}
