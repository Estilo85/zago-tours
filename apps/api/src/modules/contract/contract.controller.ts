import { Request, Response, NextFunction } from 'express';
import { ContractService } from './contract.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma, ContractStatus } from '@zagotours/database';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import {
  ReqParams,
  ReqQuery,
  TypedRequest,
} from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';

export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  create = asyncHandler(
    async (
      req: TypedRequest<{}, { agreement?: string; documentUrl?: string }>,
      res: Response
    ) => {
      const { agreement, documentUrl } = req.body;

      if (!agreement || !documentUrl) {
        return ResponseUtil.error(
          res,
          'Agreement and document URL are required',
          400
        );
      }

      const contract = await this.contractService.createContract({
        userId: req.userId!,
        agreement,
        documentUrl,
      });

      return ResponseUtil.success(
        res,
        contract,
        'Contract created successfully',
        201
      );
    }
  );

  sign = asyncHandler(async (req: TypedRequest<UuidParam>, res: Response) => {
    const contract = await this.contractService.signContract(
      req.params.id,
      req.userId!
    );

    return ResponseUtil.success(res, contract, 'Contract signed successfully');
  });

  getMyContracts = asyncHandler(async (req: TypedRequest, res: Response) => {
    const contracts = await this.contractService.getByUser(req.userId!);
    return ResponseUtil.success(res, contracts);
  });

  getAll = asyncHandler(
    async (
      req: ReqQuery<{
        page?: number;
        limit?: number;
        status?: string;
        userId?: string;
      }>,
      res: Response
    ) => {
      const { page = 1, limit = 10, status, userId } = req.query;

      const filters: Prisma.ContractWhereInput = {};

      if (status) {
        filters.status = status as ContractStatus;
      }

      if (userId) {
        filters.userId = String(userId);
      }

      const result = await this.contractService.paginate(
        Number(page),
        Number(limit),
        { where: filters }
      );

      return ResponseUtil.paginated(res, result);
    }
  );

  getPending = asyncHandler(async (req: TypedRequest, res: Response) => {
    const contracts = await this.contractService.getPending();
    return ResponseUtil.success(res, contracts);
  });

  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const contract = await this.contractService.getById(req.params.id);
    return ResponseUtil.success(res, contract);
  });

  delete = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    await this.contractService.delete(req.params.id, true);
    return ResponseUtil.success(res, null, 'Contract deleted successfully');
  });
}
