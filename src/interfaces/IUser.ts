import { IModel } from "./IModel";

export interface IUser extends IModel{
  name: string;
  email: string;
  password: string;
  salt: string;
  group: IUserGroup[];
}

export interface IUserGeneration {
  name: string;
  email: string;
  password: string;
}

export interface IUserGroup {
  id: string;
  joined: string;
}
