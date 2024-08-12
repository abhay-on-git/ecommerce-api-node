const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res,next)=>{
    res.json({message:"Hello World!"})
})

module.exports = app