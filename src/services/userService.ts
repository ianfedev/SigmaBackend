import { Service, Inject } from "typedi";
import argon2 from 'argon2';
import { IUser, IUserGeneration } from "../interfaces/IUser";
import { randomBytes } from "crypto";
import { Logger } from "winston";

@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel : Models.UserModel,
    @Inject('logger') private logger : Logger
  ){}

  public async createUser(userInputRegistration : IUserGeneration): Promise<IUser> {
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInputRegistration.password, {salt});
      const userRecord = await this.userModel.create({
        ...userInputRegistration,
        salt:  salt.toString('hex'),
        password: hashedPassword
      });
      if (!userRecord) throw new Error("User can not be created.");
      Reflect.deleteProperty(userRecord, 'password');
      Reflect.deleteProperty(userRecord, 'salt');
      return userRecord.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async viewUser(id : string): Promise<IUser> {
    try {
      const userRecord = await this.userModel.findById(id);
      if (!userRecord) throw new Error("User was not registered.");
      Reflect.deleteProperty(userRecord, 'password');
      Reflect.deleteProperty(userRecord, 'salt');
      return userRecord.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateUser(id : string, updatable : IUser): Promise<IUser> {
    try {
      Reflect.deleteProperty(updatable, 'password');
      Reflect.deleteProperty(updatable, 'salt');
      const userRecord = await this.userModel.findByIdAndUpdate(id, updatable, {new: true});
      if (!userRecord) throw new Error("User was not registered.");
      Reflect.deleteProperty(userRecord, 'password');
      Reflect.deleteProperty(userRecord, 'salt');
      return userRecord.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
