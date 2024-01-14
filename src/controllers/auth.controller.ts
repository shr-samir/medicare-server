import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import jwt from 'jsonwebtoken';
import config from '../config';
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from '../constants/constants';

export const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registrationData = req.body;
    const data = await authService.handleRegister(registrationData);

    return res.json(data);
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
      success: false,
    });
  }
};

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginData = req.body;
    const data = await authService.handleLogin(loginData);

    return res.json(data);
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
      success: false,
    });
  }
};





export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    // throw new Error("No refresh token provided")
    return res.status(406).json({ message: 'Unauthorized' });
  }

  const verify = jwt.verify(
    refreshToken,
    config.jwt.refreshTokenSecret,
    (err, decoded) => {
      if (err) {
        // Wrong Refesh Token
        return res.status(406).json({ message: 'Unauthorized' });
      } else {
        const accessToken = jwt.sign(
          { id: decoded.id, email: decoded.email, fullName: decoded.full_name },
          config.jwt.accessTokenSecret!,
          {
            expiresIn: ACCESS_TOKEN_EXPIRY,
          }
        );
        return res.json({ accessToken });
      }
    }
  );
};
