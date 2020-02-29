import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import UserService from "../../services/userService";
import middlewares from '../middlewares';
import { IUser, IUserGeneration } from "../../interfaces/IUser";
import { IPaginateResult } from "mongoose";
import { celebrate, Joi } from "celebrate";
const route = Router();

export default (app: Router) => {

  app.use('/users', route);

  route.post(
    '/create',
    middlewares.authentication,
    middlewares.userAttachment,
    middlewares.permissions("user.create"),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const service : UserService = Container.get(UserService);
        const createdUser : IUser = await service.createUser(req.body as IUserGeneration);
        return res.status(200).json(createdUser);
      } catch (e) {
        next(e);
      }
    });

  route.get(
    '/view/:id',
    middlewares.authentication,
    middlewares.userAttachment,
    middlewares.permissions("user.read"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const service : UserService = Container.get(UserService);
        const user : IUser = await service.viewUser(req.params.id);
        return res.status(200).json(user);
      } catch (e) {
        next(e);
      }
    });

  route.get(
    '/list/:page?',
    middlewares.authentication,
    middlewares.userAttachment,
    middlewares.permissions("user.read"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const service : UserService = Container.get(UserService);
        let pages: number = 1;
        if (req.params.page) pages = + req.params.page;
        const user : IPaginateResult<IUser> = await service.listUsers(pages);
        return res.status(200).json(user);
      } catch (e) {
        next(e);
      }
    });

  route.get(
    '/me',
    middlewares.authentication,
    middlewares.userAttachment,
    async (req: Request, res: Response) => {
      return res.status(200).json(req.currentUser);
    });

  route.put(
    '/update/:id',
    middlewares.authentication,
    middlewares.userAttachment,
    middlewares.permissions("user.update"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const service : UserService = Container.get(UserService);
        const user : IUser = await service.updateUser(req.params.id, req.body as IUser);
        return res.status(200).json(user);
      } catch (e) {
        next(e);
      }
    });

};
