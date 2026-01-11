import { TripRequest, Prisma } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { TripRequestRepository } from './trip-request.repository';

export class TripRequestService extends BaseService<
  TripRequest,
  Prisma.TripRequestWhereInput,
  Prisma.TripRequestCreateInput,
  Prisma.TripRequestUpdateInput
> {
  protected readonly resourceName = 'TripRequest';

  constructor(private readonly tripRequestRepo: TripRequestRepository) {
    super(tripRequestRepo);
  }

  // Create trip request with validation
  override async create(
    data: Prisma.TripRequestCreateInput
  ): Promise<TripRequest> {
    // Validate date is in the future
    if (new Date(data.date) <= new Date()) {
      throw new Error('Trip date must be in the future');
    }

    const request = await super.create(data);

    // TODO: Send notification to admins
    // TODO: Auto-assign to agent based on destination

    return request;
  }

  // Get by trip type
  async getByTripType(tripType: string): Promise<TripRequest[]> {
    return this.tripRequestRepo.findByTripType(tripType);
  }

  // Get by destination
  async getByDestination(destination: string): Promise<TripRequest[]> {
    return this.tripRequestRepo.findByDestination(destination);
  }

  // Get by date range
  async getByDateRange(startDate: Date, endDate: Date): Promise<TripRequest[]> {
    return this.tripRequestRepo.findByDateRange(startDate, endDate);
  }

  // Get recent requests
  async getRecent(): Promise<TripRequest[]> {
    return this.tripRequestRepo.findRecent();
  }
}
