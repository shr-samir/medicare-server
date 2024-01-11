import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const handleLogin = async (req: Request, res: Response) => {
  const loginData = req.body;
  const data = await authService.handleLogin(loginData);

  return res.json(data);
};

export const handleRegister = async (req: Request, res: Response) => {
  const registrationData = req.body;
  console.log(registrationData);

  const data = await authService.handleRegister(registrationData);
  return res.json(data);
};

// export const handleLogin = async (req: Request, res: Response) => {
//   try {
//   } catch (error) {}
// };

// export const handleRegister = async (req: Request, res: Response) => {
//   try {
//   } catch (error) {}
// };
