import { ValidationError } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from 'http-errors';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export default async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof HttpError)
    return res.status(err.statusCode).send(err);
  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError)
    return res.status(StatusCodes.UNAUTHORIZED).send(err.message);
  if (err instanceof ValidationError)
    return res.status(StatusCodes.BAD_REQUEST).send(err.errors[0]?.message);
  res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};