import * as usersService from "../service/users.service.js"
import catchAsync from "../utils/catchAsync.js";
import { sendSuccess } from '../utils/responseHelper.js';
import { notFoundError } from '../core/error.response.js';

export const getAllUsers = catchAsync( async(req, res) => {
    const users = await usersService.getAllUsers();
    return sendSuccess(res, 200, 'Users retrieved successfully', users);
})

export const createUsers = catchAsync(async (req, res) => {
    const newUser = await usersService.createUsers(req.body);
    return sendSuccess(res, 201, 'User created successfully', newUser);
});

export const updateUsers = catchAsync(async (req, res) => {
    const userIndex = await usersService.updateUsers(req.params.id, req.body);
    return sendSuccess(res, 201, 'User updated successfully', userIndex);

})

export const deleteUsers = async (req, res) => {
    const userIndex = await usersService.deleteUsers(req.params.id);
    return sendSuccess(res, 201, 'User deleted successfully', userIndex);
}