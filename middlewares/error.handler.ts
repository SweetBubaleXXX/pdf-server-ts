import { ValidationError } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export default async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof ValidationError)
    return res.status(StatusCodes.BAD_REQUEST).send(err.errors[0]?.message);
  res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
};