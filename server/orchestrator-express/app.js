const express = require('express')
// const axios = require('axios')
// const Redis = require('ioredis')

const app = express()

const port = 4000
const menuRouter = require('./routes/menu')
const usersRouter = require('./routes/users')
const categoriesRouter = require('./routes/categories')
// const redis = new Redis({
//     port: 11702,
//     host: "redis-11702.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
//     username: 'default',
//     password: process.env.password || 'meuhS7QeKvdt2poorFuAVeYDb6tCLUBE',
// })

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: "Connection to Redis DB established"})
})

app.use('/menu', menuRouter)
app.use('/users', usersRouter)
app.use('/categories', categoriesRouter)

app.listen(port, () => {
    console.log('Listening to port', port);
})