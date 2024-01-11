import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UnauthenticatedError from '../errors/UnauthenticatedError';

import config from '../config'

export const jwtAuth = (req: any, res: Response, next: NextFunction) => {
  try {
    // { authorization: "Bearer <token>"}
    const token = req.headers.authorization?.split(' ')[1] as string;

    if (!token) {
      throw new UnauthenticatedError('No access token provided');
    }

    const decode = jwt.verify(token, config.jwt.accessTokenSecret!); // ! means it will not be null or undefined at runtime

    req.user = decode;

    next();
  } catch (error) {
    next(error);
  }
};
