const express =  require('express');
const router = express.Router()

const productController = require('../controller/product.controller');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/',isAuthenticated,productController.getAllProducts);
router.get('/id/:id',isAuthenticated,productController.findProductById);

module.exports = router;