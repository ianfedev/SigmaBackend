import { IUserPermissions } from "./permissions/IUserPermissions";
import { IGroupPermissions } from "./permissions/IGroupPermissions";
import { IModel } from "./IModel";

export interface IGroup extends IModel {
  name: string;
  createdBy: string;
  admin: boolean;
  permissions: IPermissions;
}

export interface IPermissions {
  user: IUserPermissions;
  group: IGroupPermissions;
}
