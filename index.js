import express from "express";
import router from "./src/route/route.js";
import errorHandler from "./src/middleware/errorHandler.js";
import { NotFoundError } from './src/core/error.response.js';
import {config} from "./src/config/env.config.js";
import {connectDB} from "./src/config/db.config.js";

const app = express(); //khởi tạo 1 đối tượng ứng dụng
app.use(express.json()); //1 dạng middleware - đọc dữ liệu từ file json của người dùng
app.use("/", router) // đăng kí router vào đường dẫn chính, mọi link bắt đầu từ / sẽ chuyển qua router.js xử lí
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  next(new NotFoundError(`Resource ${req.originalUrl} not found`));
});

app.use(errorHandler) // đăng kí middleware xử lí lỗi

const startServer = async () => {
    await connectDB(); // Kết nối đến cơ sở dữ liệu 

    app.listen(config.app.port, () =>{
      console.log(`Server is running on port http://localhost:${config.app.port}`);
    });
    } 


startServer();
