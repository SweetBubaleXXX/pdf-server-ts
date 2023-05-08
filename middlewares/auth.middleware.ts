import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from '../config/auth.config';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization)
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    const [scheme, token] = req.headers.authorization.split(' ');
    if (scheme.toLowerCase() !== 'bearer')
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    jwt.verify(token, AUTH_SECRET);
    next();
  } catch (err) { next(err) }
};
