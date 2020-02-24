import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import argon2 from 'argon2';
import { IUser } from '../interfaces/IUser';

@Service()
export default class AuthService {

  constructor(
    @Inject('userModel') private userModel : Models.UserModel,
    @Inject('logger') private logger
  ) {}

  public async signIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.userModel.findOne({ email });
    if (!userRecord) {
      throw new Error('User not registered');
    }

    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      const token = AuthService.generateToken(userRecord._id);
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  private static generateToken(user : string) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign(
      {
        _id: user,
        exp: exp.getTime() / 1000
      },
      config.jwtSecret
    );
  }
}
