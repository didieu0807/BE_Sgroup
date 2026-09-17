import * as userRepository from "../repository/user.repository.js"
import { notFoundError } from '../core/error.response.js';

export const getAllUsers = async ({ sortBy, order }) => {
    return await userRepository.findAll({ sortBy, order });
}
export const getUserById = async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
        throw notFoundError(`User with ID ${id} not found`);
    }
    return user;
    };
export const createUser = async ({ name, email, age }) => {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error(`User with email ${email} already exists`);
    }
    return await userRepository.create({ name, email, age });
};
export const updateUser = async (id, { name, email, age }) => {
    const user = await userRepository.findById(id);
    if (!user) {
        throw notFoundError(`User with ID ${id} not found`);
    }
    if (email && email !== user.email) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error(`User with email ${email} already exists`);
        }
    }
    return await userRepository.update(id, { name, email, age });
};
export const deleteUser = async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
        throw notFoundError(`User with ID ${id} not found`);
    }
    return await userRepository.deleteById(id);
};
