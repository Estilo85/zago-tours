import { BaseRepository } from '../../common/repository/base.repository';
import { Event } from '@zagotours/database';

export class EventRepository extends BaseRepository<Event> {
  constructor() {
    super('event');
  }

  async findUpcoming() {
    return this.model.findMany({
      where: {
        date: {
          gte: new Date(),
        },
        deletedAt: null,
      },
      orderBy: { date: 'asc' },
    });
  }

  async findByCreator(createdBy: string) {
    return this.model.findMany({
      where: { createdBy, deletedAt: null },
      orderBy: { date: 'desc' },
    });
  }

  async decrementSpotLeft(id: string) {
    return this.model.update({
      where: { id },
      data: {
        spotLeft: {
          decrement: 1,
        },
      },
    });
  }
}

export const eventRepository = new EventRepository();
