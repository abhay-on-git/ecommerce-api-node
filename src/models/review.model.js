const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: "true",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: "true",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('reviews',reviewSchema);

module.exports = Review;