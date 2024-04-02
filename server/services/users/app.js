const express = require('express')
const cors = require('cors')

const app = express()
const userRouter = require('./routes/user')
const { getDatabase } = require('./config/config')

const port = 4001

// app.get(getDatabase())

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/users', userRouter)

getDatabase().then(() => {
    app.listen(port, () => {
        console.log('Listening to Port:', port);
    })
}).catch((error) => {
    console.log('Error at getting database');
})
