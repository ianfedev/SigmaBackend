import { Service, Inject } from 'typedi';
import { IUser } from '../interfaces/IUser';
import { IGroup } from "../interfaces/IGroup";
import { Logger } from "winston";

@Service()
export default class GroupService {

  constructor(
    @Inject('userModel') private userModel : Models.UserModel,
    @Inject('groupModel') private groupModel : Models.GroupModel,
    @Inject('logger') private logger : Logger
  ) {}

  public async createGroup(group : IGroup, user : IUser): Promise<IGroup> {
    try {
      const groupRecord = await this.groupModel.create({
        ...group,
        createdBy: user._id
      });
      if (!groupRecord) throw new Error("There was an error creating a group.");
      return groupRecord;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async viewGroup(id : string): Promise<IGroup> {
    try {
      const groupRecord = await this.groupModel.findById(id);
      if (!groupRecord) throw new Error("Queried group does not exist.");
      return groupRecord;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateGroup(id : string, updatable : IGroup): Promise<IGroup> {
    try {
      const groupRecord = await this.groupModel.findByIdAndUpdate(id, updatable, {new: true});
      if (!groupRecord) throw new Error("Queried group does not exist.");
      return groupRecord;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addUser(id : string, group : string): Promise<IUser> {
    try {
      const userRecord = await this.userModel.findByIdAndUpdate(id, {$push: {group: {id: group, joined: new Date()}}}, {new: true});
      if (!userRecord) throw new Error("Queried user does not exist.");
      Reflect.deleteProperty(userRecord, 'password');
      Reflect.deleteProperty(userRecord, 'salt');
      return userRecord;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async removeUser(id : string, group : string): Promise<IUser> {
    try {
      const userRecord = await this.userModel.findByIdAndUpdate(id, {$pull: {group: {id: group}}}, {new: true});
      if (!userRecord) throw new Error("Queried user does not exist.");
      Reflect.deleteProperty(userRecord, 'password');
      Reflect.deleteProperty(userRecord, 'salt');
      return userRecord;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
