const { User } = require("../models/user")

module.exports = {
    getAllUsers: async (req, res, next) => {
        const usersData = await User.getUsers()

        if(!usersData.error){
            res.status(200).json({statusCode: 200, data: usersData})
        } else {
            res.status(usersData.error.status).json({statusCode: usersData.error.status, message: usersData.error.message})
        }
    },
    findById: async (req, res, next) => {
        const { id } = req.params
        console.log(id);
        
        const userData = await User.getUserById(id)

        if(!userData.error){
            res.status(200).json({statusCode: 200, data: userData})
        } else {
            res.status(userData.error.status).json({statusCode: userData.error.status, message: userData.error.message})
        }
    },
    createNewUser: async (req, res, next) => {
        const { username, email, password, phoneNumber, address } = req.body

        const newUser = await User.createNewUser({username, email, password, phoneNumber, address})
        const newUserData = await User.getUserById(newUser.insertedId)

        if(!newUser.error){
            res.status(201).json({statusCode: 201, data: {
                _id: newUser.insertedId,
                username,
                email,
                password,
                role: newUserData[0].role,
                phoneNumber,
                address
            }})
        } else {
            res.status(newUser.error.status).json({statusCode: newUser.error.status, message: newUser.error.message})
        }

    },
    editUser: async (req, res, next) => {
        const { username, email, password, phoneNumber, address } = req.body
        const { id } = req.params

        const updatedUser = await User.editUser(id, {username, email, password, phoneNumber, address})

        if(!updatedUser.error){
            res.status(201).json({statusCode: 200, message: `User with ID ${id} has successfully been updated`})
        } else {
            res.status(updatedUser.error.status).json({statusCode: updatedUser.error.status, message: updatedUser.error.message})
        }
    },
    deleteUser: async (req, res, next) => {
        console.log(req.params);
        const { id } = req.params

        const deletedUser = await User.deleteUserData(id)

        if(!deletedUser.error){
            res.status(200).json({statusCode: 200, message: `User with ID ${id} has successfully been deleted`})
        } else {
            res.status(deletedUser.error.status).json({statusCode: deletedUser.error.status, message: deletedUser.error.message})
        }
    }
}