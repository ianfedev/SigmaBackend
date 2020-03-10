import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import GroupService from "../../services/groupService";
import { IGroup } from "../../interfaces/IGroup";
import middlewares from "../middlewares";
import { celebrate, Joi } from "celebrate";
import { IPaginateResult } from "mongoose";
import { IUser } from "../../interfaces/IUser";
import UserService from "../../services/userService";
const route = Router();

export default (app: Router) => {

  app.use('/group', route);

  route.post(
    '/create',
    middlewares.authentication,
    middlewares.userAttachment,
    middlewares.permissions("group.create"),
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
    middlewares.permissions("group.read"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const groupService : GroupService = Container.get(GroupService);
        const group : IGroup = await groupService.viewGroup(req.params.id);
        return res.json(group).status(200);
      } catch (e) {
        return next(e);
      }
    });

  route.get(
    '/list/:page?',
    middlewares.authentication,
    middlewares.userAttachment,
    middlewares.permissions("group.read"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const service : GroupService = Container.get(GroupService);
        let pages: number = 1;
        if (req.params.page) pages = + req.params.page;
        const group : IPaginateResult<IGroup> = await service.listGroup(pages);
        return res.status(200).json(group);
      } catch (e) {
        next(e);
      }
    });

  route.put(
    '/update/:id',
    middlewares.authentication,
    middlewares.userAttachment,
    middlewares.permissions("group.update"),
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
    middlewares.permissions("group.assign"),
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
    middlewares.permissions("group.assign"),
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
