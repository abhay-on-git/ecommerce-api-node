const reviewService = require('../services/review.service')

const createReview = async(req,res)=>{
    const user = req.user
    try {
        const review = await reviewService.createReview(user,req.body)
        res.status(201).json(review)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const getAllReviews = async(req,res)=>{
    const user = req.user
    try {
        const reviews = await reviewService.getAllReview(req.params.id)
        res.status(201).json(reviews)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}


module.exports = {
    createReview,
    getAllReviews
}