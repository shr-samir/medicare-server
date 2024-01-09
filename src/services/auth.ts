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
import { ILoginData } from '../interfaces/ILoginData';
import { IRegistrationData } from '../interfaces/IRegistrationData';
import { PrismaClient } from '@prisma/client';
import BadRequestError from '../errors/BadRequestError';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../constants/jwt';
import config from '../config';
import { error } from 'console';
// import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../constants/jwt';

const SALT_ROUNDS = 10;

const prisma = new PrismaClient();
export const handleLogin = async (loginData: ILoginData) => {
  const user = await prisma.user.findFirst({
    where: { email: loginData.email },
  });

  if (!user) {
    throw new BadRequestError('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(loginData.password, user.password);

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

export const handleRegister = async (registrationData: IRegistrationData) => {
  const userEmailExits = await prisma.user.findFirst({
    where: { email: registrationData.email },
  });
  if (userEmailExits) {
    throw new BadRequestError(
      `User with email: ${registrationData.email} already exists`
    );
  }
  const hashedPassword = await bcrypt.hash(
    registrationData.password,
    SALT_ROUNDS
  );

  const newUser = await prisma.user.create({
    data: {
      full_name: registrationData.fullname,
      gender: registrationData.gender,
      age: registrationData.age,
      address: registrationData.address,
      phone_number: registrationData.phoneNumber,
      email: registrationData.email,
      password: hashedPassword,
    },
  });
  return {
    message: 'User registered successfully',
  };
};
