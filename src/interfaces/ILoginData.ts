import { IBase } from './IBase';

export interface ILoginData extends IBase {
  email: string;
  password: string;
}
