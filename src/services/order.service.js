const cartService = require('../services/cart.service')
const Address = require('../models/address.model')
const Order = require('../models/order.model')
const OrderItem = require('../models/orderItems.model')

async function createOrder(user,shippingAddress){
    let address;
    if(shippingAddress._id){
        const existAddress = await Address.findById(shippingAddress._id);
        address = existAddress
    }else{
        address = new Address(shippingAddress)
        address.user = user
        await address.save();

        user.address.push(address)
        await user.save();
    }
    const cart = await cartService.findUserCart(user._id)
    const orderItems = []
    
    for(const item of cart.cartItems){
        const orderItem = new OrderItem({
            price:item.price,
            quantity:item.quantity,
            product:item.product,
            size:item.size,
            userId:item.userId,
            discountedPrice:item.discountedPrice
        })
        const createdOrderItem = await orderItem.save()
        orderItems.push(createdOrderItem)
    }

    const createdOrder = new Order({
        user,
        orderItems,
        shippingAddress:address,
        totalPrice:cart.totalPrice,
        totalDiscountedPrice:cart.totalDiscountedPrice,
        discount:cart.discount,
        totalItem:cart.totalItem
    })
    const savedOrder = await createdOrder.save();
    return savedOrder;
}

async function placeOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED"
    return await order.save();
}

async function confirmOrder(orderId){
    const order = await findOrderById(orderId)
    order.orderStatus = "CONFIRMED";
    return await order.save();
}

async function shipOrder(orderId){
    const order = await findOrderById(orderId)
    order.orderStatus = "SHIPPED";
    return await order.save();
}

async function deliverOrder(orderId){
    const order = await findOrderById(orderId)
    order.orderStatus = "DELIVERED";
    return await order.save();
}

async function cancelOrder(orderId){
    const order = await findOrderById(orderId)
    order.orderStatus = "CANCELLED";
    return await order.save();
}

async function findOrderById(orderId){
    const order = await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItems",populate:{path:"product"}})
    .populate("shippingAddress")

    return order;
}

async function userOrderHistory(userId){
    try {
        const orders = await Order.find({user:userId,orderStatus:"PLACED"})
        .populate({path:"orderItems",populate:{path:"product"}}).lean()
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllOrders(){
    return await Order.find()
    .populate({path:"orderItems",populate:{path:"product"}}).lean()
}

async function deleteOrder(orderId){
    const order = findOrderById(orderId)
    await Order.findByIdAndDelete(order._id)
}

module.exports = {
    createOrder,
    placeOrder,
    confirmOrder,
    deleteOrder,
    getAllOrders,
    userOrderHistory,
    cancelOrder,
    deliverOrder,
    shipOrder,
}