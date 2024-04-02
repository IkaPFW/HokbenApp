const axios = require("axios")
const Redis = require('ioredis')

const userAPI = 'http://localhost:4001/users/'
const redis = new Redis({
    port: 11702,
    host: "redis-11702.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
    username: 'default',
    password: process.env.password || 'meuhS7QeKvdt2poorFuAVeYDb6tCLUBE',
})

module.exports = {
    
    getAllUsers: async (req, res, next) => {
        try {
            const userCache = await redis.get("app:users")
            
            if(userCache){
                const data = JSON.parse(userCache)
                
                console.log(data, '<-- From cache');
                return res.status(200).json(data)
            }
            
            const { data } = await axios.get(userAPI)

            console.log(data, '<--- From axios');

            await redis.set("app:users", JSON.stringify(data))

            res.status(200).json(data)
        } catch (error) {
            // res.status(500).json({message: error})
            const errRes = error.response.data
            const status = errRes.statusCode
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    },
    getUserById: async (req, res, next) => {
        const { id } = req.params

        try {
            const userCache = await redis.get(`app:userID${id}`)

            if(userCache){
                const data = JSON.parse(userCache)

                console.log(data, '<-- From cache');
                return res.status(200).json(data)
            }
            
            const { data } = await axios.get(userAPI + `${id}`)

            console.log(data, '<--- From axios');

            await redis.set(`app:userID${id}`, JSON.stringify(data))

            res.status(200).json(data)
        } catch (error) {
            // console.log(error);
            const errRes = error.response.data
            const status = errRes.statusCode
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
            // res.status(500).json({message: error})
        }
    },
    createUser: async (req, res, next) => {
        const { username, email, password, phoneNumber, address } = req.body

        try {
            const { data } = await axios.post(userAPI, {
                username,
                email,
                password,
                phoneNumber,
                address
            })
            const { updateAll } = await axios.get(userAPI)

            await redis.set("app:users", JSON.stringify(updateAll))

            res.status(201).json({data})
        } catch (error) {
            // console.log(error);
            const errRes = error.response.data
            const status = errRes.statusCode
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    },
    editUser: async (req, res, next) => {
        const { username, email, password, phoneNumber, address } = req.body
        const { id } = req.params

        try {
            const { data } = await axios.put(userAPI + `${id}`, {
                username,
                email,
                password,
                phoneNumber,
                address
            })
            const { updateAll } = await axios.get(userAPI)
            const { updateData } = await axios.get(userAPI + `${id}`)

            await redis.set(`app:userID${id}`, JSON.stringify(updateData))
            await redis.set("app:users", JSON.stringify(updateAll))

            res.status(200).json({data})
        } catch (error) {
            const errRes = error.response.data
            const status = errRes.statusCode
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    },
    deleteUser: async (req, res, next) => {
        const { id } = req.params

        try {
            const { data } = await axios.delete(userAPI + `${id}`)
            const { updateAll } = await axios.get(userAPI)
            const { updateData } = await axios.get(userAPI + `${id}`)

            await redis.set(`app:userID${id}`, JSON.stringify(updateData))
            await redis.set("app:users", JSON.stringify(updateAll))

            res.status(200).json({data})
        } catch (error) {
            const errRes = error.response.data
            const status = errRes.statusCode
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    }
}