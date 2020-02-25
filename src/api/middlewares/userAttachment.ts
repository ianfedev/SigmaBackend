import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { Logger } from "winston";

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const userAttachment = async (req, res, next) => {
  const logger : Logger = Container.get('logger');
  try {
    const userModel = Container.get('userModel') as Models.UserModel;
    const userRecord = await userModel.findById(req.token._id);
    if (!userRecord) return res.sendStatus(401);
    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    logger.error(e);
    return next(e);
  }
};

export default userAttachment;
