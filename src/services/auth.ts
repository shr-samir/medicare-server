// import * as authRepo from '../repositories/auth';
// import { ILoginData } from '../interfaces/ILoginData';
// import { IRegistrationData } from '../interfaces/IRegistrationData';

// export const handleLogin = async (loginData: ILoginData) => {
//   const data = authRepo.handleLogin(loginData);
//   return data;
// };

// export const handleRegister = async (registrationData: IRegistrationData) => {
//   const data = authRepo.handleRegister(registrationData);
//   return data;
// };

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import { SALT_ROUNDS } from '../constants/constants';
import { ILoginData } from '../interfaces/ILoginData';
import { IRegistrationData } from '../interfaces/IRegistrationData';
import BadRequestError from '../errors/BadRequestError';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../constants/constants';
import config from '../config';
import { error } from 'console';



const prisma = new PrismaClient();

// ------------------- business logic for registration ------------------
export const handleRegister = async (body: IRegistrationData) => {
  const userEmailExits = await prisma.user.findFirst({
    where: { email: body.email },
  });
  if (userEmailExits) {
    throw new BadRequestError(`User with email: ${body.email} already exists`);
  }
  const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);

  const newUser = await prisma.user.create({
    data: {
      full_name: body.fullname,
      gender: body.gender,
      age: body.age,
      address: body.address,
      phone_number: body.phoneNumber,
      email: body.email,
      password: hashedPassword,
    },
  });
  return {
    message: 'User registered successfully',
  };
};

// ------------------- business logic for login ------------------
export const handleLogin = async (body: ILoginData) => {
  const user = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (!user) {
    throw new BadRequestError('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(body.password, user.password);

  if (!passwordMatch) {
    throw new BadRequestError('Invalid email or password');
  }

  const accessToken = jwt.sign(user, config.jwt.accessTokenSecret!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(user, config.jwt.refreshTokenSecret!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  return {
    accessToken,
    refreshToken,
  };
};


