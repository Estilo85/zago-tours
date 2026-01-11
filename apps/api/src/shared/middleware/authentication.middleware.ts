import { Request, Response, NextFunction } from 'express';
import { getToken } from 'next-auth/jwt';
import { ResponseUtil } from '../utils/response';

export const authenticate = async (
  req: Request,
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
      role: token.role as any,
      name: token.name!,
    };
    req.userId = token.sub;

    next();
  } catch (error) {
    return ResponseUtil.error(res, 'Session expired or invalid', 401);
  }
};
