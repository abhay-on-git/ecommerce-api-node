const ratingService = require('../services/rating.service')

const createRating = async(req,res)=>{
    try {
        const rating = await ratingService.createRating(user,req.body)
        res.status(201).json(rating)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}