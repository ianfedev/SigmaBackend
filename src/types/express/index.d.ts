import { Document, PaginateModel } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { IGroup } from "../../interfaces/IGroup";

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = PaginateModel<IUser & Document>;
    export type GroupModel = PaginateModel<IGroup & Document>;
  }
}
