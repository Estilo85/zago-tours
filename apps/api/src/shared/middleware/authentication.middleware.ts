// authentication.middleware.ts
import { Response, NextFunction } from 'express';
import { JwtUtil } from '../utils/jwt';
import { ResponseUtil } from '../utils/responseUtils';
import { TypedRequest } from '../types/express.types';
import { Role } from '@zagotours/types';
import { prisma } from '@zagotours/database';

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

    // ✅ Check if user exists and is not suspended
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: {
        id: true,
        status: true,
        role: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return ResponseUtil.error(res, 'User not found', 404);
    }

    // ✅ Block suspended users
    if (user.status === 'SUSPENDED') {
      return ResponseUtil.error(
        res,
        'Your account has been suspended. Please contact support.',
        403,
      );
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      name: user.name,
    };
    req.userId = user.id;

    next();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Authentication failed';
    return ResponseUtil.error(res, message, 401);
  }
};
