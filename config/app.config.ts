import 'dotenv/config';
import express from 'express';
import adminRouter from '../routes/admin.router';
import userRouter from '../routes/user.router';
import authMiddleware from '../middlewares/auth.middleware';
import errorHandler from '../middlewares/error.handler';

export default () => {
  const app = express();
  app.set('port', process.env.PORT || 3000);

  app.use('/admin', adminRouter);
  app.use(authMiddleware);
  app.use('/users', userRouter);
  app.use(errorHandler);

  return app;
}; 