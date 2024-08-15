const express =  require('express');
const router = express.Router()

const ratingController = require('../controller/rating.controller');
const { isAuthenticated } = require('../middleware/authenticate');

router.post('/create',isAuthenticated,ratingController.createRating);
router.get('/product/:productId',isAuthenticated,ratingController.getAllRatings);

module.exports = router;