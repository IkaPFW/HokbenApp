const express = require('express')
const cors = require('cors')

const app = express()
const menuRouter = require('./routes/menu')
const categoryRouter = require('./routes/category')

const port = 4002

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/menu', menuRouter)
app.use('/categories', categoryRouter)

app.listen(port, () => {
    console.log('Listening to Port:', port);
})
