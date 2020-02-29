import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { celebrate, Joi } from "celebrate";
import AuthService from "../../services/authService";
import { Logger } from "winston";
const route = Router();

export default (app: Router) => {

  app.use('/authentication', route);

  route.post(
    '/login',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger : Logger = Container.get('logger');
      try {
        const { email, password } = req.body;
        const authServiceInstance : AuthService = Container.get(AuthService);
        const { user, token } = await authServiceInstance.signIn(email, password);
        return res.json({ user, token }).status(200);
      } catch (e) {
        logger.error( e );
        return next(e);
      }
    });

};
