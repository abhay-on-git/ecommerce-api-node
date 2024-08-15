const express =  require('express');
const router = express.Router()

const cartItemController = require('../controller/cartItem.controller');
const { isAuthenticated } = require('../middleware/authenticate');

router.put('/:id',isAuthenticated, cartItemController.updateCartItem);
router.delete('/:id',isAuthenticated, cartItemController.removeCartItem);

module.exports = router