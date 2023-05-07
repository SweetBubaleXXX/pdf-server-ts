import { Router, json, raw, text } from 'express';
import parseUser from '../middlewares/user.params';
import userController from '../controllers/user.controller';
import imageController from '../controllers/image.controller';
import pdfController from '../controllers/pdf.controller';
import { imageSizeLimit } from '../config/image.config';

const router = Router();

router.use(json());

router.post('/pdf', text({ type: '*/*' }), pdfController.generate);

router.post('/', userController.create);

router.param('id', parseUser);

router.route('/:id')
  .get(userController.get)
  .patch(userController.update)
  .delete(userController.delete);

router.post('/:id/image', raw({
  type: '*/*',
  limit: imageSizeLimit,
}), imageController.upload);

export default router;
