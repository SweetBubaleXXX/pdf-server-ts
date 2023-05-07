import 'dotenv/config';
import express from 'express';
import userRouter from '../routes/user';
import errorHandler from '../middlewares/error.handler';

export default () => {
  const app = express();
  app.set('port', process.env.PORT || 3000);

  app.use('/user', userRouter);
  app.use(errorHandler);

  return app;
}; 