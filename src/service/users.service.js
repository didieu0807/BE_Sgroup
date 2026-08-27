import { readData, writeData } from "../repository/readData.js";
import { notFoundError } from '../core/error.response.js';

export const getAllUsers = async () => {
    const data = await readData();
    return data.users;
}
export const createUsers = async (user) => {

        const data = await readData();
        data.users.push(user);
        await writeData(data);
        return user;
    
}
export const updateUsers = async (id, updatedUser) => {
    
        const data = await readData();
        const userIndex = data.users.findIndex(user => user.id === parseInt(id));
        if (userIndex === -1) {
            throw new notFoundError('User not found');
        }
        data.users[userIndex] = {
            ...data.users[userIndex],
            ...updatedUser
        };
        await writeData(data);
        return data.users[userIndex];

}
export const deleteUsers = async (id) => {

        const data = await readData();
        const userIndex = data.users.findIndex(user => user.id === parseInt(id));
        if (userIndex === -1) {
            throw new notFoundError('User not found');
        }
        const deletedUser = data.users.splice(userIndex, 1)[0];
        await writeData(data);
        return deletedUser;
    
}