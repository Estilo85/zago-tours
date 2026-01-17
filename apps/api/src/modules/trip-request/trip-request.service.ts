import { TripRequest, Prisma, prisma } from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { TripRequestRepository } from './trip-request.repository';

export class TripRequestService extends BaseService<
  TripRequest,
  Prisma.TripRequestWhereInput,
  Prisma.TripRequestCreateInput,
  Prisma.TripRequestUpdateInput,
  Prisma.TripRequestInclude
> {
  protected readonly resourceName = 'TripRequest';

  constructor(private readonly tripRequestRepo: TripRequestRepository) {
    super(tripRequestRepo);
  }

  /**
   * Create trip request and auto-assign to adventurer's referrer
   */
  async createForAdventurer(
    adventurerId: string,
    data: {
      tripType: string;
      destination: string;
      date: Date;
      preferences?: string;
    }
  ): Promise<TripRequest> {
    // Validate date is in the future
    if (new Date(data.date) <= new Date()) {
      throw new Error('Trip date must be in the future');
    }

    // Get adventurer to find their referrer
    const adventurer = await prisma.user.findUnique({
      where: { id: adventurerId },
      select: { referredById: true },
    });

    if (!adventurer) {
      throw new Error('Adventurer not found');
    }

    // Create request with auto-assignment to referrer
    const request = await this.create({
      adventurer: { connect: { id: adventurerId } },
      assignedAgent: adventurer.referredById
        ? { connect: { id: adventurer.referredById } }
        : undefined,
      tripType: data.tripType,
      destination: data.destination,
      date: data.date,
      preferences: data.preferences,
    });

    // TODO: Send notification to assigned agent (if exists)
    // if (adventurer.referredById) {
    //   await EmailService.notifyAgentOfNewTripRequest(adventurer.referredById, request);
    // }

    return request;
  }

  /**
   * Get requests assigned to an agent (from their referrals)
   */
  async getAssignedToAgent(agentId: string): Promise<TripRequest[]> {
    return this.tripRequestRepo.findByAssignedAgent(agentId);
  }

  /**
   * Get requests by adventurer
   */
  async getByAdventurer(adventurerId: string): Promise<TripRequest[]> {
    return this.tripRequestRepo.findByAdventurer(adventurerId);
  }

  /**
   * Get by trip type
   */
  async getByTripType(tripType: string): Promise<TripRequest[]> {
    return this.tripRequestRepo.findByTripType(tripType);
  }

  /**
   * Get by destination
   */
  async getByDestination(destination: string): Promise<TripRequest[]> {
    return this.tripRequestRepo.findByDestination(destination);
  }

  /**
   * Get by date range
   */
  async getByDateRange(startDate: Date, endDate: Date): Promise<TripRequest[]> {
    return this.tripRequestRepo.findByDateRange(startDate, endDate);
  }

  /**
   * Get recent requests
   */
  async getRecent(): Promise<TripRequest[]> {
    return this.tripRequestRepo.findRecent();
  }

  /**
   * Paginate with filters
   */
  async paginate(
    page: number,
    limit: number,
    filters?: {
      where?: Prisma.TripRequestWhereInput;
      include?: Prisma.TripRequestInclude;
      orderBy?: any;
    }
  ) {
    return this.tripRequestRepo.paginateWithDetails(
      page,
      limit,
      filters?.where
    );
  }
}
