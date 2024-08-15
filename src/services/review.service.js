const Review = require('../models/review.model');
const productService = require('../models/product.model')

async function createReview(reqData,user){
    try {
        const product = await productService.findProductById(reqData.productId)

        const review = new Review({
            user:user._id,
            product:product._id,
            review:reqData.review,
            createdAt: new Date()
        })

        await product.save();
        return await review.save();
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllReview(productId){
    const product = await productService().findProductById(reqData.productId);
    return await Review.find({product:productId}).populate("user")
}

module.exports = {
    getAllReview,
    createReview
}