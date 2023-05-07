import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.model';

export interface UserParams { user: User };

export default async (req: Request<{ user?: User }>, res: Response, next: NextFunction, id: number) => {
  try {
    const user = await User.findByPk(id);
    if (!user)
      return res.sendStatus(StatusCodes.NOT_FOUND);
    req.params.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
