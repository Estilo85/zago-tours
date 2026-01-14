import { Response } from 'express';
import { GeneralInquiryService } from './general-inquiry.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import {
  ReqBody,
  ReqParams,
  ReqQuery,
  TypedRequest,
} from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';

interface CreateInquiryDTO {
  email: string;
  message: string;
  phone?: string;
  address?: string;
}

export class GeneralInquiryController {
  constructor(private readonly inquiryService: GeneralInquiryService) {}

  create = asyncHandler(
    async (req: ReqBody<CreateInquiryDTO>, res: Response) => {
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
    }
  );

  getAll = asyncHandler(
    async (req: ReqQuery<{ page?: number; limit?: number }>, res: Response) => {
      const { page = 1, limit = 10 } = req.query;

      const result = await this.inquiryService.paginate(
        Number(page),
        Number(limit),
        { orderBy: { createdAt: 'desc' } }
      );

      return ResponseUtil.paginated(res, result);
    }
  );

  getRecent = asyncHandler(async (req: TypedRequest, res: Response) => {
    const inquiries = await this.inquiryService.getRecent();
    return ResponseUtil.success(res, inquiries);
  });

  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const inquiry = await this.inquiryService.getById(req.params.id);
    return ResponseUtil.success(res, inquiry);
  });

  delete = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    await this.inquiryService.delete(req.params.id, true);
    return ResponseUtil.success(res, null, 'Inquiry deleted successfully');
  });
}
