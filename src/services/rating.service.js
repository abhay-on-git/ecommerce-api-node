const Rating = require('../models/rating.model')
const productService = require('../services/product.service')

async function createRating (reqData,user){
    try {
        const product = await productService.findProductById(reqData.productId)

        const rating = new Rating({
            user:user._id,
            product:product._id,
            rating:reqData.rating,
            createdAt: new Date()
        })

        await product.save();
        return await rating.save();
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getProductRating(productId){
    return await Rating.find({product:productId}).populate("user")
}

module.exports = {
    getProductRating,
    createRating
}