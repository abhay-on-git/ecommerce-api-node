const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res,next)=>{
    res.json({message:"Hello World!"})
})

const authRouter = require('./routes/auth.route')
app.use('/auth',authRouter)

const userRouter = require('./routes/user.route')
app.use('/users',userRouter)

module.exports = app