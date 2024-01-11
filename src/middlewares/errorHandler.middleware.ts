import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import loggerWithNameSpace from '../utils/logger';


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
}

