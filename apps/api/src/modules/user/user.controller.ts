import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { Prisma, Role, UserStatus } from '@zagotours/database';
import {
  ReqBody,
  ReqParams,
  ReqParamsBody,
  ReqParamsQuery,
  ReqQuery,
  TypedRequest,
} from 'src/shared/types/express.types';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { UpdateUserRequest } from '@zagotours/types';
import {
  PaginationQuery,
  UuidParam,
} from 'src/common/validation/common.validation';

export class UserController {
  constructor(private readonly userService: UserService) {}

  // ===== USER PROFILE ENDPOINTS =====

  getProfile = asyncHandler(async (req: TypedRequest, res: Response) => {
    const profile = await this.userService.getProfile(req.userId!);
    return ResponseUtil.success(res, profile);
  });

  updateProfile = asyncHandler(
    async (req: ReqBody<UpdateUserRequest>, res: Response) => {
      const result = await this.userService.updateProfile(
        req.userId!,
        req.body
      );
      return ResponseUtil.success(res, result, 'Profile updated successfully');
    }
  );

  getReferrals = asyncHandler(async (req: TypedRequest, res: Response) => {
    const referrals = await this.userService.getReferrals(req.userId!);
    return ResponseUtil.success(res, referrals);
  });

  // ===== ADMIN ENDPOINTS =====

  getAllUsers = asyncHandler(
    async (
      req: ReqQuery<
        PaginationQuery & { role?: Role; status?: UserStatus; search?: string }
      >,
      res: Response
    ) => {
      const { page = 1, limit = 10, role, status, search } = req.query;

      const filters: Prisma.UserWhereInput = { deletedAt: null };

      if (role) {
        filters.role = role as Role;
      }

      if (status) {
        filters.status = status as UserStatus;
      }

      if (search) {
        filters.OR = [
          { name: { contains: String(search), mode: 'insensitive' } },
          { email: { contains: String(search), mode: 'insensitive' } },
        ];
      }

      // Use base paginate with proper signature
      const result = await this.userService.paginate(
        Number(page),
        Number(limit),
        {
          where: filters,
          include: {
            independentDetails: true,
            cooperateDetails: true,
            affiliateDetails: true,
          },
          orderBy: { createdAt: 'desc' },
        }
      );

      return ResponseUtil.paginated(res, result);
    }
  );

  getUserById = asyncHandler(
    async (req: ReqParams<UuidParam>, res: Response) => {
      const user = await this.userService.getProfile(req.params.id);
      return ResponseUtil.success(res, user);
    }
  );

  updateUser = asyncHandler(
    async (
      req: ReqParamsBody<UuidParam, { name?: string; email?: string }>,
      res: Response
    ) => {
      const user = await this.userService.update(req.params.id, req.body);
      return ResponseUtil.success(res, user, 'User updated successfully');
    }
  );

  deleteUser = asyncHandler(
    async (req: ReqParamsQuery<UuidParam, { hard: string }>, res: Response) => {
      const isHard = req.query.hard === 'true';
      await this.userService.delete(req.params.id, isHard);
      return ResponseUtil.success(res, null, 'User deleted successfully');
    }
  );
}
