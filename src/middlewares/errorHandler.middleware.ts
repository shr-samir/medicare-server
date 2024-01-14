import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import loggerWithNameSpace from '../utils/logger';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

const logger = loggerWithNameSpace('ErrorHandler');

export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatus.NOT_FOUND).json({
    message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
  });
}

export function genericErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.stack) {
    logger.error(err.stack);
  }

  // Prisma-specific error handling
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': // Unique constraint violation
        return res.status(HttpStatus.BAD_REQUEST).json({
          error: 'Duplicate entry. Please provide unique values.',
        });
      // Add more cases for specific Prisma error codes if needed
      default:
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Prisma database error.',
        });
    }
  }

  // Prisma-specific error handling
  if (err instanceof PrismaClientValidationError) {
    console.log('errror happening');
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: 'Invalid data sent',
    });
  }

  next(err);
}
