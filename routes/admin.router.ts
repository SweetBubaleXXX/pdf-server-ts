import { Router, json } from 'express';
import adminController from '../controllers/admin.controller';
import validateAdminForm from '../middlewares/admin.form';

const router = Router();

router.use(json());
router.use(validateAdminForm);

router.post('/signup', adminController.signup);
router.post('/signin', adminController.signin);

export default router;
