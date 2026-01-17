import {
  TripPlanningCall,
  Prisma,
  CallStatus,
  prisma,
} from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { TripPlanningCallRepository } from './trip-planning-call.repository';
import { CalendarService } from 'src/shared/utils/calendar.service';

interface ScheduleCallDTO {
  agentId: string;
  startTime: Date;
  endTime?: Date;
  meetingLink?: string;
}

export class TripPlanningCallService extends BaseService<
  TripPlanningCall,
  Prisma.TripPlanningCallWhereInput,
  Prisma.TripPlanningCallCreateInput,
  Prisma.TripPlanningCallUpdateInput,
  Prisma.TripPlanningCallInclude
> {
  protected readonly resourceName = 'TripPlanningCall';
  private calendarService: CalendarService;

  constructor(private readonly callRepo: TripPlanningCallRepository) {
    super(callRepo);
    this.calendarService = new CalendarService();
  }

  /**
   * Schedule a new call with Google Calendar integration
   * Auto-assigns to adventurer's referrer if agentId matches
   */
  async scheduleCall(
    adventurerId: string,
    data: ScheduleCallDTO
  ): Promise<TripPlanningCall> {
    const { agentId, startTime, endTime, meetingLink } = data;

    // Validate start time is in the future
    if (new Date(startTime) <= new Date()) {
      throw new Error('Start time must be in the future');
    }

    // Calculate end time if not provided (default 30 minutes)
    const callEndTime =
      endTime || new Date(new Date(startTime).getTime() + 30 * 60 * 1000);

    // Check for scheduling conflicts
    const hasConflict = await this.callRepo.hasConflict(
      agentId,
      new Date(startTime),
      new Date(callEndTime)
    );

    if (hasConflict) {
      throw new Error('Agent already has a call scheduled at this time');
    }

    // Get user details for calendar event
    const [adventurer, agent] = await Promise.all([
      prisma.user.findUnique({
        where: { id: adventurerId },
        select: { name: true, email: true, referredById: true },
      }),
      prisma.user.findUnique({
        where: { id: agentId },
        select: { name: true, email: true },
      }),
    ]);

    if (!adventurer || !agent) {
      throw new Error('User not found');
    }

    // Verify agent is the adventurer's referrer (optional security check)
    if (adventurer.referredById && adventurer.referredById !== agentId) {
      console.warn(
        `Agent ${agentId} is not the referrer of adventurer ${adventurerId}`
      );
    }

    // Create Google Calendar event
    let calendarEventId: string | undefined;
    let googleMeetLink: string | undefined;

    try {
      const calendarEvent = await this.calendarService.createEvent({
        summary: `Trip Planning Call - ${adventurer.name}`,
        description: `Trip planning discussion between ${adventurer.name} and ${agent.name}`,
        startTime: new Date(startTime),
        endTime: new Date(callEndTime),
        attendees: [adventurer.email, agent.email],
      });

      calendarEventId = calendarEvent.id as string;
      googleMeetLink = calendarEvent.meetingLink as string;
    } catch (error) {
      console.error('Failed to create calendar event:', error);
      // Continue without calendar event
    }

    // Create the call in database
    const call = await this.create({
      adventurer: { connect: { id: adventurerId } },
      agent: { connect: { id: agentId } },
      startTime: new Date(startTime),
      endTime: new Date(callEndTime),
      meetingLink: googleMeetLink || meetingLink,
      calendarEventId,
      status: CallStatus.SCHEDULED,
    });

    // TODO: Send confirmation emails
    // await EmailService.sendCallConfirmation(adventurer.email, agent.email, call);

    return call;
  }

  /**
   * Reschedule a call
   */
  async rescheduleCall(
    callId: string,
    newStartTime: Date,
    newEndTime?: Date
  ): Promise<TripPlanningCall> {
    const call = await this.getById(callId);

    if (call.status !== CallStatus.SCHEDULED) {
      throw new Error('Only scheduled calls can be rescheduled');
    }

    // Validate new start time
    if (new Date(newStartTime) <= new Date()) {
      throw new Error('New start time must be in the future');
    }

    const callEndTime =
      newEndTime || new Date(new Date(newStartTime).getTime() + 30 * 60 * 1000);

    // Check for conflicts (exclude current call)
    const hasConflict = await this.callRepo.hasConflict(
      call.agentId,
      new Date(newStartTime),
      new Date(callEndTime),
      callId
    );

    if (hasConflict) {
      throw new Error('Agent already has a call scheduled at this time');
    }

    // Update Google Calendar event if exists
    if (call.calendarEventId) {
      try {
        // TODO: Implement calendar update
        // await this.calendarService.updateEvent(call.calendarEventId, {...});
      } catch (error) {
        console.error('Failed to update calendar event:', error);
      }
    }

    // Update the call
    const updated = await this.update(callId, {
      startTime: new Date(newStartTime),
      endTime: new Date(callEndTime),
    });

    // TODO: Send reschedule notifications

    return updated;
  }

  /**
   * Cancel a call
   */
  async cancelCall(callId: string, reason?: string): Promise<TripPlanningCall> {
    const call = await this.getById(callId);

    if (call.status === CallStatus.COMPLETED) {
      throw new Error('Cannot cancel a completed call');
    }

    // Delete Google Calendar event if exists
    if (call.calendarEventId) {
      try {
        // TODO: Implement calendar deletion
        // await this.calendarService.deleteEvent(call.calendarEventId);
      } catch (error) {
        console.error('Failed to delete calendar event:', error);
      }
    }

    const updated = await this.update(callId, {
      status: CallStatus.CANCELLED,
    });

    // TODO: Send cancellation emails
    // TODO: Log cancellation reason

    return updated;
  }

  /**
   * Mark call as completed
   */
  async markAsCompleted(callId: string): Promise<TripPlanningCall> {
    const call = await this.getById(callId);

    if (call.status !== CallStatus.SCHEDULED) {
      throw new Error('Only scheduled calls can be marked as completed');
    }

    const updated = await this.update(callId, {
      status: CallStatus.COMPLETED,
    });

    // TODO: Send feedback request
    // TODO: Trigger follow-up workflow

    return updated;
  }

  /**
   * Auto-expire past calls
   */
  async expirePastCalls(): Promise<number> {
    const now = new Date();
    const pastCalls = await this.callRepo.findByStatus(CallStatus.SCHEDULED);

    let expiredCount = 0;

    for (const call of pastCalls) {
      if (call.startTime < now) {
        await this.update(call.id, { status: CallStatus.EXPIRED });
        expiredCount++;
      }
    }

    return expiredCount;
  }

  /**
   * Get upcoming calls for user
   */
  async getUpcoming(userId: string): Promise<TripPlanningCall[]> {
    return this.callRepo.findUpcoming(userId);
  }

  /**
   * Get calls by adventurer
   */
  async getByAdventurer(adventurerId: string): Promise<TripPlanningCall[]> {
    return this.callRepo.findByAdventurer(adventurerId);
  }

  /**
   * Get calls by agent (assigned to them from their referrals)
   */
  async getByAgent(agentId: string): Promise<TripPlanningCall[]> {
    return this.callRepo.findByAgent(agentId);
  }

  /**
   * Get calls by date range
   */
  async getByDateRange(
    startDate: Date,
    endDate: Date,
    userId?: string
  ): Promise<TripPlanningCall[]> {
    return this.callRepo.findByDateRange(startDate, endDate, userId);
  }

  /**
   * Paginate calls
   */
  async paginate(
    page: number,
    limit: number,
    filters?: {
      where?: Prisma.TripPlanningCallWhereInput;
      include?: Prisma.TripPlanningCallInclude;
      orderBy?: any;
    }
  ) {
    return this.callRepo.paginateWithDetails(page, limit, filters?.where);
  }
}
