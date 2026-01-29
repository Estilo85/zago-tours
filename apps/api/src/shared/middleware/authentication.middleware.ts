// authentication.middleware.ts
import { Response, NextFunction } from 'express';
import { JwtUtil } from '../utils/jwt';
import { ResponseUtil } from '../utils/responseUtils';
import { TypedRequest } from '../types/express.types';
import { Role } from '@zagotours/types';

export const authenticate = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return ResponseUtil.error(res, 'Unauthorized: No token provided', 401);
    }

    const token = authHeader.substring(7);

    // Use your JwtUtil to verify
    const decoded = JwtUtil.verifyAccessToken(token);

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role as Role,
      name: decoded.name,
    };
    req.userId = decoded.sub;

    next();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Authentication failed';
    return ResponseUtil.error(res, message, 401);
  }
};
