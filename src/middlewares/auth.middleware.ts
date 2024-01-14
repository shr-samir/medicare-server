import { Request, Response, NextFunction } from 'express';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

export const loginAuth = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if ( error ) {
    return res.status(400).json({
      error: `Invalid email or password. \n ${error.message}`,
    });
  }
  next();
};

export const registerAuth = (req: Request, res: Response, next: NextFunction) => {
  const {error} = registerSchema.validate(req.body);
  if ( error ) {
    return res.status(400).json({
      error: `Invalid Credintials. \n ${error.message}`,
    });
  }
  next();
}