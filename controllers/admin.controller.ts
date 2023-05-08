import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Admin, AdminCreationAttributes, AdminSigninAttributes } from '../models/admin.model';
import { AUTH_SECRET, TOKEN_EXPIRE_TIME } from '../config/auth.config';

export default {
  signup: async (req: Request<{}, {}, AdminCreationAttributes>, res: Response, next: NextFunction) => {
    try {
      const admin = await Admin.create({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
      });
      res.json({ id: admin.id });
    } catch (err) { next(err) }
  },
  signin: async (req: Request<{}, {}, AdminSigninAttributes>, res: Response, next: NextFunction) => {
    try {
      const admin = await Admin.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!admin)
        return res.sendStatus(StatusCodes.NOT_FOUND);
      const passwordIsValid = await bcrypt.compare(req.body.password, admin.password);
      if (!passwordIsValid)
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
      const token = jwt.sign(
        {
          sub: admin.id,
        },
        AUTH_SECRET,
        {
          expiresIn: TOKEN_EXPIRE_TIME,
        },
      );
      res.json({
        id: admin.id,
        accessToken: token,
      });
    } catch (err) { next(err) }
  },
};
