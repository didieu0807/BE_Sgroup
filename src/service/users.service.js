import { readData } from "../repository/readData.js";


export const getAllUsers = async () => {
  try {
    const data = await readData();
    return data.users;
  }
  catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}
export const createUsers = async (user) => {
    try {
        const data = await readData();
        data.users.push(user);
        await writeData(data);
        return user;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}
export const updateUsers = async (id, updatedUser) => {
    try {
        const data = await readData();
        const userIndex = data.users.findIndex(user => user.id === parseInt(id));
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        data.users[userIndex] = {
            ...data.users[userIndex],
            ...updatedUser
        };
        await writeData(data);
        return data.users[userIndex];
    }   
    catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
export const deleteUsers = async (id) => {
    try {
        const data = await readData();
        const userIndex = data.users.findIndex(user => user.id === parseInt(id));
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        const deletedUser = data.users.splice(userIndex, 1)[0];
        await writeData(data);
        return deletedUser;
    }
    catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}