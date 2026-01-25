import {
  TripPlanningCall,
  Prisma,
  CallStatus,
  prisma,
} from '@zagotours/database';
import { BaseService } from 'src/common/service/base.service';
import { TripPlanningCallRepository } from './trip-planning-call.repository';
import { CalendarService } from 'src/shared/utils/calendar.service';
import { EmailService } from 'src/shared/services/email.service';

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
    data: ScheduleCallDTO,
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
      new Date(callEndTime),
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
        `Agent ${agentId} is not the referrer of adventurer ${adventurerId}`,
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

      console.log(`Calendar event created: ${calendarEventId}`);
    } catch (error) {
      console.error('Failed to create calendar event:', error);
      // Continue without calendar event - call will still be created in DB
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

    // Send confirmation emails to both adventurer and agent
    try {
      await Promise.all([
        EmailService.sendCallConfirmation(adventurer.email, adventurer.name, {
          agentName: agent.name,
          startTime: new Date(startTime),
          meetingLink: googleMeetLink || meetingLink,
        }),
        EmailService.sendAgentCallNotification(agent.email, agent.name, {
          adventurerName: adventurer.name,
          adventurerEmail: adventurer.email,
          startTime: new Date(startTime),
          endTime: new Date(callEndTime),
          meetingLink: googleMeetLink || meetingLink,
          callId: call.id,
        }),
      ]);
    } catch (error) {
      console.error('Failed to send confirmation emails:', error);
      // Don't fail the request if emails fail
    }

    return call;
  }

  /**
   * Reschedule a call
   */
  async rescheduleCall(
    callId: string,
    newStartTime: Date,
    newEndTime?: Date,
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
      callId,
    );

    if (hasConflict) {
      throw new Error('Agent already has a call scheduled at this time');
    }

    // Update Google Calendar event if exists
    if (call.calendarEventId) {
      try {
        await this.calendarService.updateEvent(call.calendarEventId, {
          startTime: new Date(newStartTime),
          endTime: new Date(callEndTime),
        });
        console.log(`Calendar event updated: ${call.calendarEventId}`);
      } catch (error) {
        console.error('Failed to update calendar event:', error);
      }
    }

    // Update the call
    const updated = await this.update(callId, {
      startTime: new Date(newStartTime),
      endTime: new Date(callEndTime),
    });

    // Get user details for email
    const [adventurer, agent] = await Promise.all([
      prisma.user.findUnique({
        where: { id: updated.adventurerId },
        select: { name: true, email: true },
      }),
      prisma.user.findUnique({
        where: { id: updated.agentId },
        select: { name: true, email: true },
      }),
    ]);

    if (adventurer && agent) {
      try {
        await Promise.all([
          EmailService.sendCallRescheduledNotification(
            adventurer.email,
            adventurer.name,
            {
              agentName: agent.name,
              oldStartTime: call.startTime,
              newStartTime: new Date(newStartTime),
              meetingLink: updated.meetingLink as string,
            },
          ),
          EmailService.sendCallRescheduledNotification(
            agent.email,
            agent.name,
            {
              agentName: adventurer.name,
              oldStartTime: call.startTime,
              newStartTime: new Date(newStartTime),
              meetingLink: updated.meetingLink as string,
            },
          ),
        ]);
      } catch (error) {
        console.error('Failed to send reschedule emails:', error);
      }
    }

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
        await this.calendarService.deleteEvent(call.calendarEventId);
        console.log(`Calendar event deleted: ${call.calendarEventId}`);
      } catch (error) {
        console.error('Failed to delete calendar event:', error);
      }
    }

    const updated = await this.update(callId, {
      status: CallStatus.CANCELLED,
    });

    // Get user details for cancellation email
    const [adventurer, agent] = await Promise.all([
      prisma.user.findUnique({
        where: { id: call.adventurerId },
        select: { name: true, email: true },
      }),
      prisma.user.findUnique({
        where: { id: call.agentId },
        select: { name: true, email: true },
      }),
    ]);

    if (adventurer && agent) {
      try {
        await Promise.all([
          EmailService.sendCallCancelledNotification(
            adventurer.email,
            adventurer.name,
            {
              agentName: agent.name,
              startTime: call.startTime,
              reason: reason || 'No reason provided',
            },
          ),
          EmailService.sendCallCancelledNotification(agent.email, agent.name, {
            agentName: adventurer.name,
            startTime: call.startTime,
            reason: reason || 'No reason provided',
          }),
        ]);
      } catch (error) {
        console.error('Failed to send cancellation emails:', error);
      }
    }

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
    userId?: string,
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
    },
  ) {
    return this.callRepo.paginateWithDetails(page, limit, filters?.where);
  }
}
