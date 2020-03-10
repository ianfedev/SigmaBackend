import { IUserPermissions } from "./permissions/IUserPermissions";
import { IGroupPermissions } from "./permissions/IGroupPermissions";
import { IModel } from "./IModel";
import { IUser } from "./IUser";

export interface IGroup extends IModel {
  name: string;
  createdBy: IUser;
  admin: boolean;
  permissions: IPermissions;
}

export interface IPermissions {
  user: IUserPermissions;
  group: IGroupPermissions;
}
