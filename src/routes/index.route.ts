import { Router } from 'express';
import authRoute from './auth.route';
// import userRoute from './users';

const router = Router();

router.use('/auth', authRoute);

// router.use('/users', userRoute);


export default router;
