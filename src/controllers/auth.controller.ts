import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const registrationData = req.body;
    const data = await authService.handleRegister(registrationData);

    return res.json(data);
  } catch (error) {
    next(error);
  }
}

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginData = req.body;
    const data = await authService.handleLogin(loginData);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};