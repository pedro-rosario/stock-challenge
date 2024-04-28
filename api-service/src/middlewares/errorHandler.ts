import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../services/apiError';
import * as logger from '../services/logger';

const log = logger.setup('ErrorHandler');

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  log.error(
    `Error while executing request [${req.method} ${req.url}]: ${error.message}`,
  );

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors,
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ message: error.message });
  }

  res.status(500).json({ message: error.message });
}
