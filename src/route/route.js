import userRouter from './users.route.js';
import { Router } from 'express';
// mọi router đều là 1 middleware cô lập, hàm use(): đăng kí middleware vào chu trình xử lí request của ứng dụng
const router = Router();
router.use('/users', userRouter);

export default router;