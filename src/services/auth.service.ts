import * as authModel from '../models/auth.model';
import { ILoginData } from '../interfaces/ILoginData';
import { IRegistrationData } from '../interfaces/IRegistrationData';

export const handleRegister = async (registrationData: IRegistrationData) => {
  try {
    const data = authModel.handleRegister(registrationData);
    return data;
  } catch (err) {
    throw err;
  }
};
export const handleLogin = async (loginData: ILoginData) => {
  try {
    const data = authModel.handleLogin(loginData);
    return data;
  } catch (err) {
    throw err;
  }
};
