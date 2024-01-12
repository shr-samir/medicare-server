import { IBase } from './IBase';

export interface IRegistrationData extends IBase {
  fullname: string;
  gender: string;
  age: number;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
}
