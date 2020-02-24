import { IUserPermissions } from "./permissions/IUserPermissions";

export interface IGroup {
  _id: string;
  name: string;
  createdBy: string;
  permissions: IPermissions;
}

export interface IPermissions {
  user: IUserPermissions;
}
