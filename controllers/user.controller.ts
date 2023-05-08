import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User, UserCreationAttributes, UserUpdateAttributes } from '../models/user.model';
import { UserParams } from '../middlewares/user.params';

export default {
  create: async (req: Request<{}, {}, UserCreationAttributes>, res: Response, next: NextFunction) => {
    try {
      const user = await User.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      res.send(user);
    } catch (err) { next(err) }
  },
  get: async (req: Request<UserParams>, res: Response, next: NextFunction) => {
    try {
      res.json(req.params.user);
    } catch (err) { next(err) }
  },
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName'],
      });
      res.json(users);
    } catch (err) { next(err) }
  },
  update: async (req: Request<UserParams, {}, UserUpdateAttributes>, res: Response, next: NextFunction) => {
    try {
      const user = req.params.user;
      await user.update({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      res.json(user);
    } catch (err) { next(err) }
  },
  delete: async (req: Request<UserParams>, res: Response, next: NextFunction) => {
    try {
      await req.params.user.destroy();
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) { next(err) }
  },
};
