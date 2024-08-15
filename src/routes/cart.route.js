const express =  require('express');
const router = express.Router()

const cartController = require('../controller/cart.controller');
const { isAuthenticated } = require('../middleware/authenticate');

router.get("/",isAuthenticated,cartController.findUserCart)
router.put("/add",isAuthenticated,cartController.addItemToCart)

module.exports = router