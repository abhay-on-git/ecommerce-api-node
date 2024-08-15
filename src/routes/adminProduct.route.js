const express =  require('express');
const router = express.Router()

const productController = require('../controller/product.controller');
const { isAuthenticated } = require('../middleware/authenticate');

router.post('/',isAuthenticated,productController.createProduct);
router.post('/creates',isAuthenticated,productController.createMultipleProduct);
router.post('/:id',isAuthenticated,productController.deleteProduct);
router.put('/:id',isAuthenticated,productController.updateProduct);

module.exports = router;