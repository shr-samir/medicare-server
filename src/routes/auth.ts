import { Router } from 'express';

import * as authController from '../controllers/auth';

const router = Router();

router.post('/login', authController.handleLogin);

router.post('/register', authController.handleRegister);

export default router;
