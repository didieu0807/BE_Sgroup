import * as userRepository from "../repository/user.repository.js";
import { ConflictError, UnauthorizedError, NotFoundError } from "../core/error.response.js";
import { hashPassword, comparePassword } from "../utils/password.helper.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.helper.js";

/**
 * Nghiệp vụ Đăng ký tài khoản
 */
export const register = async ({ name, email, password, role }) => {
  // 1. Kiểm tra email đã được đăng ký chưa
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictError("Email này đã được sử dụng!");
  }

  // 2. Băm mật khẩu
  const hashedPassword = await hashPassword(password);

  // 3. Lưu vào Database
  const newUser = await userRepository.create({
    name,
    email,
    password: hashedPassword,
    role: role || "MEMBER",
  });

  // 4. Trả về thông tin user vừa tạo (không lộ mật khẩu)
  return newUser;
};

/**
 * Nghiệp vụ Đăng nhập & Cấp Cặp Token (Access + Refresh)
 */
export const login = async ({ email, password }) => {
  // 1. Tìm user theo email
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new UnauthorizedError("Email hoặc mật khẩu không chính xác!");
  }

  // 2. Kiểm tra mật khẩu
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Email hoặc mật khẩu không chính xác!");
  }

  // 3. Chuẩn bị payload cho Token
  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  // 4. Sinh Access Token (ngắn hạn) và Refresh Token (dài hạn)
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken({ id: user.id });

  // 5. Lưu Refresh Token vào Database để quản lý phiên
  await userRepository.updateRefreshToken(user.id, refreshToken);

  // 6. Trả về thông tin cơ bản kèm cả 2 token
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

/**
 * Nghiệp vụ Lấy thông tin user hiện tại
 */
export const getMe = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new NotFoundError("Người dùng không còn tồn tại trên hệ thống!");
  }
  return user;
};