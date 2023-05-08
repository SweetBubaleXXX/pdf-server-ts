import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!(req.body.email && req.body.password))
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  next();
};
