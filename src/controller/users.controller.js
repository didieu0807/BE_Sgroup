import * as usersService from "../service/users.service.js"
export const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message
        });
    }
}
export const createUsers = async (req, res) => {
    try {
        const {id, name, email} = await req.body;
        if (!id || !name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: id, name, and email are required'
            });
        }
        const newUser = {
            ...req.body,
            role: 'user',
            createdAt: new Date().toISOString()
        }
        users.push(newUser);
        res.status(201).json({
            success: true,
            message: 'New user is created successfully',
            data: newUser
        });
    } catch(error) {
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message
        });
    }
}
export const updateUsers = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email} = req.body; 
        const userIndex = users.findIndex(user => user.id === parseInt(id));
        if(userIndex === -1){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        users[userIndex] = {
            ...users[userIndex],
            name: name || users[userIndex].name,
            email: email || users[userIndex].email
        };
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: users[userIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}
export const deleteUsers = async (req, res) => {
    try {
        const {id} = req.params;
        const userIndex = users.findIndex(user => user.id === parseInt(id));
        if(userIndex === -1){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const deletedUser = users.splice(userIndex, 1);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}