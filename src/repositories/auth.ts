import bcrypt from 'bcrypt';
import Jwt  from 'jsonwebtoken';
import { ILoginData } from '../interfaces/ILoginData';
import { IRegistrationData } from '../interfaces/IRegistrationData';
import { PrismaClient } from '@prisma/client';

const SALT_ROUNDS = 10; 

const prisma = new PrismaClient();
export const handleLogin = async (loginData: ILoginData) => {

  try {
    const user = await prisma.user.findFirst({where: {email: loginData.email}})
    if (!user) {
      return {error: 'User not found'};
    }

    const passwordMatch = await bcrypt.compare(loginData.password, user.password);

    if (!passwordMatch) {
      return {error: 'Incorrect password'};
    }

    return {
      msg: 'Login successful',
    };
  } catch (error) {
    console.log(error);
    return {error: 'Error while logging in'};
  }
  
};

export const handleRegister = async (registrationData: IRegistrationData) => {

  try {
    const userExists = await prisma.user.findFirst({where: {email: registrationData.email}})
    if (userExists) {
      return {error: 'User already exists'};
    }
    const hashedPassword = await bcrypt.hash(registrationData.password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        full_name: registrationData.fullname,
        gender: registrationData.gender,
        age: registrationData.age,
        address: registrationData.address,
        phone_number: registrationData.phoneNumber,
        email: registrationData.email,
        password: hashedPassword
        } 
    })
    return {
      msg: 'Register repository',
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return {error: 'Error while registering user'};
  }
  return {
    msg: 'Register repository',
    data: registrationData,
  };
}
