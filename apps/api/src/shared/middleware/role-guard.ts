import { Request, Response, NextFunction } from 'express';
import { Role } from '@zagotours/types';
import { ResponseUtil } from '../utils/response';

export const requireRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return ResponseUtil.error(res, 'Authentication required', 401);
    }

    if (!roles.includes(req.user.role)) {
      return ResponseUtil.error(
        res,
        'Access denied: Insufficient permissions',
        403
      );
    }

    next();
  };
};
