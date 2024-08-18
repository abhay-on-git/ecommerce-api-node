const express =  require('express');
const router = express.Router()

const reviewController = require('../controller/review.controller');
const { isAuthenticated } = require('../middleware/authenticate');

router.post('/create',isAuthenticated,reviewController.createReview);
router.get('/product/:productId',isAuthenticated,reviewController.getAllReviews);

module.exports = router;