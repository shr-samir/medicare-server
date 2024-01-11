import * as authModel from '../models/auth.model';
import { ILoginData } from '../interfaces/ILoginData';
import { IRegistrationData } from '../interfaces/IRegistrationData';

export const handleLogin = async (loginData: ILoginData) => {
  const data = authModel.handleLogin(loginData);
  return data;
};

export const handleRegister = async (registrationData: IRegistrationData) => {
  const data = authModel.handleRegister(registrationData);
  return data;
};
