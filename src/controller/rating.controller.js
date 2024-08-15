const ratingService = require('../services/rating.service')

const createRating = async(req,res)=>{
    const user = req.user
    try {
        const rating = await ratingService.createRating(user,req.body)
        res.status(201).json(rating)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const getAllRatings = async(req,res)=>{
    try {
        const ratings = await ratingsService.createRating(req.params.id)
        res.status(201).json(ratings)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

module.exports = {
    createRating,
    getAllRatings
}