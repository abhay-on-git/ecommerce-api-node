const {mongoose } = require("mongoose")

const MONGO_URL = "mongodb://abhayagnihotri1585:m8RP2XS6aUBoOjAL@abhayagnihotri1585/?ssl=true&replicaSet=atlas-tft4i2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"

const connectDB = ()=>{
    mongoose.connect(MONGO_URL)
}

module.exports = {connectDB}