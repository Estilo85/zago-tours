import { Request, Response, NextFunction } from 'express';
import { GeneralInquiryService } from './general-inquiry.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';

export class GeneralInquiryController {
  constructor(private readonly inquiryService: GeneralInquiryService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, message, phone, address } = req.body;

      if (!email || !message) {
        return ResponseUtil.error(res, 'Email and message are required', 400);
      }

      const inquiry = await this.inquiryService.create({
        email,
        message,
        phone,
        address,
      });

      return ResponseUtil.success(
        res,
        inquiry,
        'Inquiry submitted successfully',
        201
      );
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const result = await this.inquiryService.paginate(
        Number(page),
        Number(limit),
        { orderBy: { createdAt: 'desc' } }
      );

      return ResponseUtil.paginated(res, result);
    } catch (error) {
      next(error);
    }
  };

  getRecent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inquiries = await this.inquiryService.getRecent();
      return ResponseUtil.success(res, inquiries);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inquiry = await this.inquiryService.getById(req.params.id);
      return ResponseUtil.success(res, inquiry);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.inquiryService.delete(req.params.id, true);
      return ResponseUtil.success(res, null, 'Inquiry deleted successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };
}
