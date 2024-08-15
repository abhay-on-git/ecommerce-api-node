const express =  require('express');
const router = express.Router()

const adminOrderController = require('../controller/adminOrder.controller');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/',isAuthenticated,adminOrderController.getAllOrders);
router.put('/:orderId/confirmed',isAuthenticated,adminOrderController.confirmOrders)
router.put('/:orderId/ship',isAuthenticated,adminOrderController.shipOrders)
router.put('/:orderId/deliver',isAuthenticated,adminOrderController.deleteOrders)
router.put('/:orderId/cancell',isAuthenticated,adminOrderController.cancellOrders)
router.put('/:orderId/delete',isAuthenticated,adminOrderController.deleteOrders)

module.exports = router;