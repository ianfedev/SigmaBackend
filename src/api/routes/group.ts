import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import GroupService from "../../services/groupService";
import { IGroup } from "../../interfaces/IGroup";
import middlewares from "../middlewares";
import { celebrate, Joi } from "celebrate";
import { IUser } from "../../interfaces/IUser";
const route = Router();

export default (app: Router) => {

  app.use('/group', route);

  route.post(
    '/create',
    middlewares.authentication,
    middlewares.userAttachment,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const groupService : GroupService = Container.get(GroupService);
        const group : IGroup = await groupService.createGroup(req.body as IGroup, req.currentUser);
        return res.json(group).status(200);
      } catch (e) {
        return next(e);
      }
    });

  route.get(
    '/view/:id',
    middlewares.authentication,
    middlewares.userAttachment,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const groupService : GroupService = Container.get(GroupService);
        const group : IGroup = await groupService.viewGroup(req.params.id);
        return res.json(group).status(200);
      } catch (e) {
        return next(e);
      }
    });

  route.put(
    '/update/:id',
    middlewares.authentication,
    middlewares.userAttachment,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const groupService : GroupService = Container.get(GroupService);
        const group : IGroup = await groupService.updateGroup(req.params.id, req.body as IGroup);
        return res.json(group).status(200);
      } catch (e) {
        return next(e);
      }
    });

  route.post(
    '/add-user',
    celebrate({
      body: Joi.object({
        user: Joi.string().required(),
        group: Joi.string().required()
      })
    }),
    middlewares.authentication,
    middlewares.userAttachment,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const groupService : GroupService = Container.get(GroupService);
        const user : IUser = await groupService.addUser(req.body.user, req.body.group);
        return res.json(user).status(200);
      } catch (e) {
        return next(e);
      }
    });

  route.post(
    '/remove-user',
    celebrate({
      body: Joi.object({
        user: Joi.string().required(),
        group: Joi.string().required()
      })
    }),
    middlewares.authentication,
    middlewares.userAttachment,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const groupService : GroupService = Container.get(GroupService);
        const user : IUser = await groupService.removeUser(req.body.user, req.body.group);
        return res.json(user).status(200);
      } catch (e) {
        return next(e);
      }
    });

};
