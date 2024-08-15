const express =  require('express');
const router = express.Router()

const orderController = require('../controller/order.controller');
const { isAuthenticated } = require('../middleware/authenticate');

router.post('/',isAuthenticated,orderController.createOrder);
router.post('/user',isAuthenticated,orderController.orderHistory);
router.post('/:id',isAuthenticated,orderController.findOrderById);

module.exports = router;