import { Response, NextFunction } from 'express';
import { getToken } from 'next-auth/jwt';
import { ResponseUtil } from '../utils/response';
import { TypedRequest } from '../types/express.types';
import { Role } from '@zagotours/types';

export const authenticate = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return ResponseUtil.error(res, 'Unauthorized: No session found', 401);
    }
    req.user = {
      id: token.sub!,
      email: token.email!,
      role: token.role as Role,
      name: token.name!,
    };
    req.userId = token.sub;
    next();
  } catch (error) {
    return ResponseUtil.error(res, 'Session expired or invalid', 401);
  }
};
