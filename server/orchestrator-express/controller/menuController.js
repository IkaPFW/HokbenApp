// const redis = require("../app");
const axios = require("axios")
const Redis = require('ioredis')

const productAPI = 'http://localhost:4002/'
const userAPI = 'http://localhost:4001/users/'

const redis = new Redis({
    port: 11702,
    host: "redis-11702.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
    username: 'default',
    password: process.env.password || 'meuhS7QeKvdt2poorFuAVeYDb6tCLUBE',
})

module.exports = {
    getAllMenu: async (req, res, next) => {
        try {
            const menuCache = await redis.get("app:menu")

            if(menuCache){
                const data = JSON.parse(menuCache)

                console.log(data, '<-- From cache');
                return res.status(200).json(data)
            }
            
            const { data } = await axios.get(productAPI + 'menu')

            console.log(data, '<--- From axios');

            await redis.set("app:menu", JSON.stringify(data))

            return res.status(200).json(data)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: error})
        }
    },
    getMenuById: async (req, res, next) => {
        const { id } = req.params

        try {
            const menuCache = await redis.get(`app:menuID${id}`)

            if(menuCache){
                const data = JSON.parse(menuCache)

                console.log(data, '<-- From cache');
                return res.status(200).json(data)
            }
            
            const { data } = await axios.get(productAPI + `menu/${id}`)
            const { data: author } = await axios.get(userAPI + `${data.data.UserMongoId}`)
            data.User = author

            console.log(data, '<--- From axios');

            await redis.set(`app:menuID${id}`, JSON.stringify(data))

            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    createMenu: async (req, res, next) => {
        const { name, japaneseName, description, price, imgUrl, categoryId } = req.body

        try {
            const { data } = await axios.post(productAPI + 'menu', {
                name,
                japaneseName,
                description,
                price,
                imgUrl,
                categoryId
            })
            const { updateAll } = await axios.get(productAPI + 'menu')

            await redis.set("app:menu", JSON.stringify(updateAll))

            res.status(201).json({data})
        } catch (error) {
            const errRes = error.response.data
            const status = errRes.status
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    },
    editMenu: async (req, res, next) => {
        const { name, japaneseName, description, price, imgUrl, categoryId } = req.body
        const { id } = req.params

        try {
            const { data } = await axios.put(productAPI + `menu/${id}`, {
                name,
                japaneseName,
                description,
                price,
                imgUrl,
                categoryId
            })
            const { updateAll } = await axios.get(productAPI + 'menu')
            const { updateData } = await axios.get(productAPI + `menu/${id}`)

            await redis.set(`app:menuID${id}`, JSON.stringify(updateData))
            await redis.set("app:menu", JSON.stringify(updateAll))

            res.status(200).json({data})
        } catch (error) {
            const errRes = error.response.data
            const status = errRes.status
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    },
    deleteMenu: async (req, res, next) => {
        const { id } = req.params

        try {
            const { data } = await axios.delete(productAPI + `menu/${id}`)
            const { updateAll } = await axios.get(productAPI + 'menu')
            const { updateData } = await axios.get(productAPI + `menu/${id}`)

            await redis.set(`app:menuID${id}`, JSON.stringify(updateData))
            await redis.set("app:menu", JSON.stringify(updateAll))

            res.status(200).json({data})
        } catch (error) {
            const errRes = error.response.data
            const status = errRes.status
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    }
}