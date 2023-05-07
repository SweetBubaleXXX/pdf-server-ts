import { Request, Response, NextFunction } from 'express';
import { UserParams } from '../middlewares/user.params';
import { StatusCodes } from 'http-status-codes';

export default {
  upload: async (req: Request<UserParams, {}, Buffer>, res: Response, next: NextFunction) => {
    try {
      await req.params.user.update({
        image: req.body.toString('base64'),
      });
      res.sendStatus(StatusCodes.OK);
    } catch (err) { next(err) }
  },
};
