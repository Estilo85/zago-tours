import { Response } from 'express';
import { EventService } from './event.service';
import { ResponseUtil } from 'src/shared/utils/responseUtils';
import { Prisma } from '@zagotours/database';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import {
  ReqBody,
  ReqParams,
  ReqParamsBody,
  ReqParamsQuery,
  ReqQuery,
  TypedRequest,
} from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';
import { CreateEventDto, UpdateEventDto } from '@zagotours/types';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';

export class EventController {
  constructor(private readonly eventService: EventService) {}

  //==================
  //GET ALL EVENTS
  //==================
  getAll = asyncHandler(
    async (
      req: ReqQuery<{
        page?: number;
        limit?: number;
        location?: string;
        startDate?: string;
        endDate?: string;
      }>,
      res: Response
    ) => {
      const { page = 1, limit = 10, location, startDate, endDate } = req.query;

      const filters: Prisma.EventWhereInput = { deletedAt: null };

      if (location) {
        filters.location = {
          contains: String(location),
          mode: 'insensitive',
        };
      }

      if (startDate && endDate) {
        filters.date = {
          gte: new Date(String(startDate)),
          lte: new Date(String(endDate)),
        };
      }

      const result = await this.eventService.paginate(
        Number(page),
        Number(limit),
        {
          where: filters,
          orderBy: { date: 'asc' },
        }
      );

      return ResponseUtil.paginated(res, result);
    }
  );

  //==================
  //GET UPCOMING EVENTS
  //==================
  getUpcoming = asyncHandler(async (req: TypedRequest, res: Response) => {
    const events = await this.eventService.getUpcoming();
    return ResponseUtil.success(res, events);
  });

  //==================
  //GET SINGLE EVENT
  //==================
  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const event = await this.eventService.getById(req.params.id);
    return ResponseUtil.success(res, event);
  });

  //==================
  //CREATE NEW EVENT
  //==================
  create = asyncHandler(async (req: ReqBody<CreateEventDto>, res: Response) => {
    const eventData = req.body;

    // Handle media upload if file is present
    if (req.file) {
      const uploadResult = await CloudinaryService.uploadFile(
        req.file,
        'event'
      );
      eventData.mediaUrl = uploadResult.url;
      eventData.publicId = uploadResult.publicId;
    }
    const createData = {
      ...eventData,
      createdBy: req.userId as string,
    };
    const event = await this.eventService.create(createData);
    return ResponseUtil.success(res, event, 'Event created', 201);
  });

  //==================
  //UPDATE AN EVENT
  //==================

  update = asyncHandler(
    async (req: ReqParamsBody<UuidParam, UpdateEventDto>, res: Response) => {
      const eventData = req.body;
      const { id } = req.params;
      // Get existing event to handle media replacement
      const existingEvent = await this.eventService.getById(id);

      // Handle new media upload
      if (req.file) {
        // Delete old media if it exists
        if (existingEvent.publicId) {
          await CloudinaryService.deleteFile(existingEvent.publicId);
        }

        const uploadResult = await CloudinaryService.uploadFile(
          req.file,
          'event'
        );
        eventData.mediaUrl = uploadResult.url;
        eventData.publicId = uploadResult.publicId;
      }

      const event = await this.eventService.update(id, eventData);
      return ResponseUtil.success(res, event, 'Event updated');
    }
  );

  //==================
  //DELETE AN EVENT
  //==================
  delete = asyncHandler(
    async (
      req: ReqParamsQuery<UuidParam, { hard?: string }>,
      res: Response
    ) => {
      const isHard = req.query.hard === 'true';
      const { id } = req.params;

      // Get event to delete associated media
      const event = await this.eventService.getById(id);

      // Delete from Cloudinary if hard delete or event has media
      if (isHard && event.publicId) {
        await CloudinaryService.deleteFile(event.publicId);
      }

      await this.eventService.delete(id, isHard);
      return ResponseUtil.success(res, null, 'Event deleted');
    }
  );
}
