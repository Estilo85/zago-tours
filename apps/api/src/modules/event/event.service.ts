import { Event, prisma, Prisma } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { EventRepository } from './event.repository';
import { EventStatus } from '@zagotours/types';

export class EventService extends BaseService<
  Event,
  Prisma.EventWhereInput,
  Prisma.EventCreateInput,
  Prisma.EventUpdateInput
> {
  protected readonly resourceName = 'Event';

  constructor(private readonly eventRepo: EventRepository) {
    super(eventRepo);
  }

  async getUpcoming(): Promise<Event[]> {
    return this.eventRepo.findUpcoming();
  }

  async getByLocation(location: string): Promise<Event[]> {
    return this.eventRepo.findByLocation(location);
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
    return this.eventRepo.findByDateRange(startDate, endDate);
  }

  async getAvailableEvents(): Promise<Event[]> {
    return this.eventRepo.findWithAvailableSpots();
  }

  // Registration logic
  async registerForEvent(eventId: string, userId: string) {
    return await prisma.$transaction(async (tx) => {
      // 1. Get event
      const event = await tx.event.findUnique({
        where: { id: eventId, deletedAt: null },
      });

      if (!event) {
        throw new Error('Event not found');
      }

      // 2. Check existing registration
      const existing = await tx.eventRegistration.findUnique({
        where: { userId_eventId: { userId, eventId } },
      });

      if (existing) {
        throw new Error('Already registered for this event');
      }

      // 3. Validate business rules
      if (event.spotLeft <= 0) {
        throw new Error('Event is fully booked');
      }

      if (new Date() > new Date(event.joinTill)) {
        throw new Error('Registration deadline has passed');
      }

      // 4. Create registration
      const registration = await tx.eventRegistration.create({
        data: {
          eventId,
          userId,
          status: EventStatus.CONFIRMED,
        },
        include: {
          event: {
            select: {
              title: true,
              date: true,
              location: true,
              mediaUrl: true,
            },
          },
        },
      });

      // 5. Decrement spots
      await tx.event.update({
        where: { id: eventId },
        data: { spotLeft: { decrement: 1 } },
      });

      return registration;
    });
  }

  async cancelRegistration(eventId: string, userId: string) {
    return await prisma.$transaction(async (tx) => {
      const registration = await tx.eventRegistration.findUnique({
        where: { userId_eventId: { userId, eventId } },
      });

      if (!registration) {
        throw new Error('Registration not found');
      }

      if (registration.status === EventStatus.CANCELLED) {
        throw new Error('Registration already cancelled');
      }

      // Update registration status
      await tx.eventRegistration.update({
        where: { id: registration.id },
        data: { status: EventStatus.CANCELLED },
      });

      // Increment spots back
      await tx.event.update({
        where: { id: eventId },
        data: { spotLeft: { increment: 1 } },
      });

      return { message: 'Registration cancelled successfully' };
    });
  }

  async getUserRegistrations(
    userId: string,
    filters?: { status?: string; upcomingOnly?: boolean },
  ) {
    return this.eventRepo.findUserRegistrations(userId, filters);
  }

  async getEventStats() {
    return this.eventRepo.getStats();
  }

  async checkUserRegistration(userId: string, eventId: string) {
    return this.eventRepo.findRegistration(userId, eventId);
  }
}
