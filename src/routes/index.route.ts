import { Router } from 'express';
import authRoute from './auth.route';
import userRoute from './users.route';
import { jwtAuth } from '../middlewares/jwtVerify.middleware';
// import userRoute from './users';

const router = Router();

router.use('/auth', authRoute);

router.use('/user', jwtAuth, userRoute);

export default router;
