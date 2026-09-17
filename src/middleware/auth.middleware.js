import { UnauthorizedError } from "../core/error.response.js";
import { verifyAccessToken } from "../utils/jwt.helper.js"; 

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Bạn chưa đăng nhập! Vui lòng cung cấp token hợp lệ."));
  }

  const token = authHeader.split(" ")[1];

  try {
    // kiểm tra tính hợp lệ và chữ ký accessSecret
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new UnauthorizedError("Token của bạn đã hết hạn, vui lòng đăng nhập lại!"));
    }
    return next(new UnauthorizedError("Token không hợp lệ hoặc đã bị chỉnh sửa trái phép!"));
  }
};