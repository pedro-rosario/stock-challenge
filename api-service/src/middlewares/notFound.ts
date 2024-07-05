import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../services/apiError';

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  throw ApiError.notFound('Page not found');
}
