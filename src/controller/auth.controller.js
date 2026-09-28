import * as authService from "../service/auth.service.js";
import catchAsync from "../utils/catchAsync.js";
import {SendSuccess} from "../utils/responseHelper.js";

export const register = catchAsync(async (req, res) => {
  const newUser = await authService.register(req.body);
  return SendSuccess(res, 201, "Đăng ký tài khoản thành công!", newUser);
});

export const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  return SendSuccess(res, 200, "Đăng nhập thành công!", result);
});

export const getMe = catchAsync(async (req, res) => {
  // req.user được gán từ auth.middleware.js sau khi verify token thành công
  const currentUserId = req.user.id;
  const userProfile = await authService.getMe(currentUserId);
  return SendSuccess(res, 200, "Lấy thông tin cá nhân thành công!", userProfile);
});