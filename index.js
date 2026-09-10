import express from "express";
import router from "./src/route/route.js";
import { readData } from "./src/repository/readData.js";
import errorHandler from "./src/middleware/errorHandler.js";


const app = express(); //khởi tạo 1 đối tượng ứng dụng
app.use(express.json()); //1 dạng middleware - đọc dữ liệu từ file json của người dùng
app.use("/", router) // đăng kí router vào đường dẫn chính, mọi link bắt đầu từ / sẽ chuyển qua router.js xử lí

app.use(errorHandler) // đăng kí middleware xử lí lỗi

app.listen(3000, () =>{
  console.log("Server is running on port http://localhost:3000");
})