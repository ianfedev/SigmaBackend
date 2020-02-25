import { IUserPermissions } from "./permissions/IUserPermissions";
import { IGroupPermissions } from "./permissions/IGroupPermissions";

export interface IGroup {
  _id: string;
  name: string;
  createdBy: string;
  admin: boolean;
  permissions: IPermissions;
}

export interface IPermissions {
  user: IUserPermissions;
  group: IGroupPermissions;
}
