const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems",
      },
    ],
    orderDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    deliveryDate: {
      type: Date,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
    paymentDetails: {
      paymentMethod: {
        type: String,
      },
      transctionId: {
        type: String,
      },
      paymentId: {
        type: String,
      },
      paymentStatus: {
        type: String,
        default: "PENDING",
      },
    },
    totalPrice: {
      type: String,
      required: true,
    },
    totalDiscountedPrice: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    orderStaus: {
      type: String,
      required: true,
      default: "PENDING",
    },
    totalItem: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
