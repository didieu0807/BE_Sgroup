import express from "express";
const app = express();
const PORT = 4000;

// 1. Route Trang chủ
app.get("/", (req, res) => {
  res.send(`
    <h1>Trang Chủ</h1>
    <ul>
      <li><a href="/about">Xem trang Giới thiệu (Nội bộ)</a></li>
      <li><a href="https://google.com" target="_blank">Mở trang Google (Trang ngoài)</a></li>
      <li><a href="/go-facebook">Click để tự động chuyên hướng sang Facebook</a></li>
    </ul>
  `);
});

// 2. Route Giới thiệu
app.get("/about", (req, res) => {
  res.send(`
    <h1>Trang Giới Thiệu</h1>
    <p>Đây là trang thông tin chi tiết.</p>
    <a href="/"> Quay lại Trang chủ</a>
  `);
});

// 3. Route sử dụng res.redirect() để chuyển hướng sang trang web khác
app.get("/go-facebook", (req, res) => {
  res.redirect("https://facebook.com");
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});