const { ObjectId } = require("mongodb")
const {  getCurrentDatabase } = require("../config/config")

class User{
    static async getUsers(){
        // const db = getDatabase()
        const db = await getCurrentDatabase()

        try {
            const usersData = await db.collection("users").find().toArray()
    
            return usersData
        } catch (error) {
            return {error: {status: 500, message: "Internal server error"}}
        }
    }

    static async getUserById(id){
        console.log(id);
        // const db = getDatabase()
        const db = await getCurrentDatabase()

        try {
            const userData = await db.collection("users").find({
                _id: new ObjectId(id)
            }).toArray()
            
            if(userData.length >= 1){
                return userData
            } else {
                throw {status: 404}
            }
        } catch (error) {
            if(error.name === "BSONError" || error.status === 404){
                return {error: {status: 404, message: `User with ID ${id} not found`}}
            } else {
                return {error: {status: 500, message: "Internal server error"}}
            }
        }
    }

    static async createNewUser({username, email, password, phoneNumber, address}){
        // const db = await getDatabase()
        const db = await getCurrentDatabase()
        const collUser = db.collection("users")
        
        try {
            if(!username || !email || !password){
                let errMsg = []

                if(!username){
                    errMsg.push("Username is required")
                }

                if(!email){
                    errMsg.push("Email is required")
                }

                if(!password){
                    errMsg.push("Password is required")
                }

                throw {status: 400, message: errMsg}
            }

            const newData = await collUser.insertOne({
                username,
                email,
                password,
                role: "user",
                phoneNumber,
                address
            })
    
            return newData
        } catch (error) {
            if(error.status === 400){
                return {error: {status: error.status, message: error.message}}
            } else {
                return {error: {status: 500, message: "Internal server error"}}
            }
        }
    }

    static async editUser( id, {username, email, password, phoneNumber, address}){
        // const db = await getDatabase()
        const db = await getCurrentDatabase()
        const collUser = db.collection("users")
        try {
            const oldData = await collUser.find({_id: new ObjectId(id)}).toArray()

            if(oldData.length >= 1){
                const updatedData = await collUser.updateOne({
                    _id: new ObjectId(id)
                }, {
                    $set: {
                        username: username ? username : oldData[0].username,
                        email: email ? email : oldData[0].email,
                        password: password ? password : oldData[0].password,
                        role: "user",
                        phoneNumber: phoneNumber ? phoneNumber : oldData[0].phoneNumber,
                        address: address ? address : oldData[0].address
                    }
                })
        
                return updatedData
            } else {
                throw {status: 404}
            }
        } catch (error) {
            if(error.name === "BSONError" || error.status === 404){
                return {error: {status: 404, message: `User with ID ${id} not found`}}
            } else {
                return {error: {status: 500, message: "Internal server error"}}
            }
        }
        
    }

    static async deleteUserData(id){
        // const db = getDatabase()
        const db = await getCurrentDatabase()
        
        try {
            const deletedData = await db.collection("users").deleteOne({_id: new ObjectId(id)})
            // console.log(deletedData);

            if(deletedData.deletedCount >= 1){
                return deletedData
            } else {
                throw {status: 404}
            }
        } catch (error) {
            if(error.name === "BSONError" || error.status === 404){
                return {error: {status: 404, message: `User with ID ${id} not found`}}
            } else {
                return {error: {status: 500, message: "Internal server error"}}
            }
        }
    }
}

module.exports = {User}