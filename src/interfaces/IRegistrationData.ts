import { IBase } from './IBase';

export interface IRegistrationData extends IBase {
  fullname: string;
  gender: Gender;
  age: number;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}