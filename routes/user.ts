import { Router, Request, Response, NextFunction, json } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.model';
import errorHandler from '../middlewares/error.handler';
import userController from '../controllers/user.controller';

export const router = Router();

router.use(json());

router.post('/pdf');

router.post('/image')

router.post('/', userController.create);

router.param('id', async (req: Request<{ user?: User }>, res: Response, next: NextFunction, id: number) => {
  const user = await User.findByPk(id);
  if (!user)
    return res.sendStatus(StatusCodes.NOT_FOUND);
  req.params.user = user;
  next();
});

router.route('/:id')
  .get(userController.get)
  .patch(userController.update)
  .delete(userController.delete);

router.use(errorHandler);
