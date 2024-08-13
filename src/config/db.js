const {mongoose } = require("mongoose")

const MONGO_URL = "mongodb+srv://abhayagnihotri1585:m8RP2XS6aUBoOjAL@cluster0.yizjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = ()=>{
    mongoose.connect(MONGO_URL)
}

module.exports = {connectDB}

