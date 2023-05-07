import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User, UserCreationAttributes, UserUpdateAttributes } from '../models/user.model';

interface UserParams { user: User };

export default {
  create: async (req: Request<{}, {}, UserCreationAttributes>, res: Response, next: NextFunction) => {
    try {
      const user = await User.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      res.send(user);
    } catch (err) {
      next(err);
    }
  },
  get: async (req: Request<UserParams>, res: Response) => {
    res.json(req.params.user);
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
    } catch (err) {
      next(err);
    }
  },
  delete: async (req: Request<UserParams>, res: Response) => {
    await req.params.user.destroy();
    res.sendStatus(StatusCodes.NO_CONTENT);
  },
}
