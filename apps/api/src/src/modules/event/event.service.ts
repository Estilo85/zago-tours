import { Event, Prisma } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { EventRepository } from './event.repository';

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

  // Domain-specific business logic
  async getUpcoming(): Promise<Event[]> {
    return this.eventRepo.findUpcoming();
  }

  async getByLocation(location: string): Promise<Event[]> {
    return this.eventRepo.findByLocation(location);
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
    return this.eventRepo.findByDateRange(startDate, endDate);
  }
}
