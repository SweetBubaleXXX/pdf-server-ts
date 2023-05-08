import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.model';
import { UserParams } from '../middlewares/user.params';
import generatePdf from '../utils/pdf.util';

export default {
  generate: async (req: Request<{}, {}, string>, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body,
        },
      });
      if (!user)
        return res.sendStatus(StatusCodes.NOT_FOUND);
      const pdfBuffer = await generatePdf(user);
      await user.update({
        pdf: pdfBuffer,
      });
      res.json(user);
    } catch (err) { next(err) }
  },
  download: async (req: Request<UserParams>, res: Response, next: NextFunction) => {
    try {
      const user = req.params.user;
      if (!user.pdf)
        return res.sendStatus(StatusCodes.NOT_FOUND);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', user.pdf.length);
      res.send(user.pdf);
    } catch (err) { next(err) }
  },
};
