const express =  require('express');
const router = express.Router()

const authController = require('../controller/auth.controller');
const userController = require('../controller/user.controller');

router.post('/', userController.getAllUsers);
router.get('/progile', userController.getUserProfile);

module.exports = router;