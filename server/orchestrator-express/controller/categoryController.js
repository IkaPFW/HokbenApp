const axios = require("axios")
const Redis = require('ioredis')

const productAPI = 'http://localhost:4002/'

const redis = new Redis({
    port: 11702,
    host: "redis-11702.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
    username: 'default',
    password: process.env.password || 'meuhS7QeKvdt2poorFuAVeYDb6tCLUBE',
})

module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
        const categoryCache = await redis.get("app:categories")

            if(categoryCache){
                const data = JSON.parse(categoryCache)
                
                console.log(data, '<-- From cache');
                return res.status(200).json(data)
            }
            
            const { data } = await axios.get(productAPI + 'categories')

            console.log(data, '<--- From axios');

            await redis.set("app:categories", JSON.stringify(data))

            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    getCategoryById: async (req, res, next) => {
        const { id } = req.params

        try {
            const categoryCache = await redis.get(`app:categoriesID${id}`)

            if(categoryCache){
                const data = JSON.parse(categoryCache)

                console.log(data, '<-- From cache');
                return res.status(200).json(data)
            }
            
            const { data } = await axios.get(productAPI + `categories/${id}`)

            console.log(data, '<--- From axios');

            await redis.set(`app:categoriesID${id}`, JSON.stringify(data))

            res.status(200).json(data)
        } catch (error) {
            // res.status(500).json({message: error})
            const errRes = error.response.data
            const status = errRes.status
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    },
    createCategory: async (req, res, next) => {
        const { name } = req.body

        try {
            const { data } = await axios.post(productAPI + 'categories', {
                name
            })
            const { updateAll } = await axios.get(productAPI + 'categories')

            await redis.set("app:categories", JSON.stringify(updateAll))

            res.status(201).json({data})
        } catch (error) {
            const errRes = error.response.data
            const status = errRes.status
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    },
    editCategory: async (req, res, next) => {
        const { name } = req.body
        const { id } = req.params

        try {
            const { data } = await axios.put(productAPI + `categories/${id}`, {
                name
            })
            const { updateAll } = await axios.get(productAPI + 'categories')
            const { updateData } = await axios.get(productAPI + `categories/${id}`)

            await redis.set(`app:categoriesID${id}`, JSON.stringify(updateData))
            await redis.set("app:categories", JSON.stringify(updateAll))

            res.status(200).json({data})
        } catch (error) {
            const errRes = error.response.data
            const status = errRes.status
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    },
    deleteCategory: async (req, res, next) => {
        const { id } = req.params

        try {
            const { data } = await axios.delete(productAPI + `categories/${id}`)
            const { updateAll } = await axios.get(productAPI + 'categories')
            const { updateData } = await axios.get(productAPI + `categories/${id}`)

            await redis.set(`app:categoriesID${id}`, JSON.stringify(updateData))
            await redis.set("app:categories", JSON.stringify(updateAll))

            res.status(200).json({data})
        } catch (error) {
            const errRes = error.response.data
            const status = errRes.status
            const message = typeof errRes.message == "object" ? errRes.message[0] : errRes.message

            res.status(status).json({message: message})
        }
    }
}