import { Request, Response, NextFunction } from 'express';
import { CallbackRequestService } from './callback-request.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';

export class CallbackRequestController {
  constructor(private readonly callbackService: CallbackRequestService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, phone, bestTime } = req.body;

      // Validation
      if (!name || !email || !phone || !bestTime) {
        return ResponseUtil.error(res, 'All fields are required', 400);
      }

      const request = await this.callbackService.create(req.body);
      return ResponseUtil.success(
        res,
        request,
        'Callback request submitted successfully',
        201
      );
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, startDate, endDate } = req.query;

      let result;

      if (startDate && endDate) {
        const requests = await this.callbackService.getByDateRange(
          new Date(String(startDate)),
          new Date(String(endDate))
        );
        return ResponseUtil.success(res, requests);
      }

      result = await this.callbackService.paginate(
        Number(page),
        Number(limit),
        { orderBy: { createdAt: 'desc' } }
      );

      return ResponseUtil.paginated(res, result);
    } catch (error) {
      next(error);
    }
  };

  getPending = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requests = await this.callbackService.getPending();
      return ResponseUtil.success(res, requests);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = await this.callbackService.getById(req.params.id);
      return ResponseUtil.success(res, request);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.callbackService.delete(req.params.id, true); // Hard delete
      return ResponseUtil.success(res, null, 'Request deleted successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };
}
