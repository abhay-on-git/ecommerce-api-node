const orderService = require('../services/order.service')

const createOrder = async(req,res)=>{
    const user = req.user;
    try {
        const createdOrder = await orderService.createOrder(user,req.body)
        res.status(201).send(createdOrder)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const findOrderById = async(req,res)=>{
    try {
        const order = await orderService.findOrderById(req.params.id)
        res.status(201).send(order)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const orderHistory = async(req,res)=>{
    try {
        const userOrderHistory = await orderService.userOrderHistory(user._id)
        res.status(201).send(userOrderHistory)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}
module.exports = {createOrder,findOrderById,orderHistory}