import 'dotenv/config';
import express from 'express';
import { router as userRouter } from '../routes/user';

export default () => {
  const app = express();
  app.set('port', process.env.PORT || 3000);

  app.use(userRouter);

  return app;
}; 