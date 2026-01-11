import { Request, Response, NextFunction } from 'express';
import { ContractService } from './contract.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { NotFoundException } from 'src/common/service/base.service';
import { Prisma, ContractStatus } from '@zagotours/database';

export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      next(error);
    }
  };

  sign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contract = await this.contractService.signContract(
        req.params.id,
        req.userId!
      );

      return ResponseUtil.success(
        res,
        contract,
        'Contract signed successfully'
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      if (error instanceof Error) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  };

  getMyContracts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contracts = await this.contractService.getByUser(req.userId!);
      return ResponseUtil.success(res, contracts);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        filters
      );

      return ResponseUtil.paginated(res, result);
    } catch (error) {
      next(error);
    }
  };

  getPending = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contracts = await this.contractService.getPending();
      return ResponseUtil.success(res, contracts);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contract = await this.contractService.getById(req.params.id);
      return ResponseUtil.success(res, contract);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.contractService.delete(req.params.id, true);
      return ResponseUtil.success(res, null, 'Contract deleted successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return ResponseUtil.error(res, error.message, 404);
      }
      next(error);
    }
  };
}
