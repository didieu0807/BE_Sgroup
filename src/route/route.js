import userRouter from './users.route.js';
import { Router } from 'express';
import authRouter from './auth.route.js';
import uploadRouter from './upload.route.js';
// mọi router đều là 1 middleware cô lập, hàm use(): đăng kí middleware vào chu trình xử lí request của ứng dụng
const router = Router();
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use("/upload", uploadRouter);
export default router;