import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@zagotours/database';
import { ResponseUtil } from '../utils/response';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002')
      return ResponseUtil.error(res, 'Conflict: Record exists', 409);
    if (err.code === 'P2025') return ResponseUtil.error(res, 'Not Found', 404);
  }

  return ResponseUtil.error(
    res,
    'Internal Server Error',
    500,
    process.env.NODE_ENV === 'development' ? err.message : undefined
  );
};
