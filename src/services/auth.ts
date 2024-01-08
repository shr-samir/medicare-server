import * as authRepo from '../repositories/auth';
import { ILoginData } from '../interfaces/ILoginData';
import { IRegistrationData } from '../interfaces/IRegistrationData';

export const handleLogin = async (loginData: ILoginData) => {
  const data = authRepo.handleLogin(loginData);
  return data;
};

export const handleRegister = async (registrationData: IRegistrationData) => {
  const data = authRepo.handleRegister(registrationData);
  return data;
};
