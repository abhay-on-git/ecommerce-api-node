const userService = require("../services/user.service");
const CartItem = require("../models/cartItem.model");
const User = require("../models/user.model");

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const item = await CartItem.findById(cartItemId);
    const user = await userService.getUserById(item.userId);
    if (!item) {
      return { status: 404, message: "Item not found" };
    }
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem();
    }
    return { status: 401, message: "Unauthorized" };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  try {
    const cartItem = await CartItem.findById(cartItemId);
    if (cartItem.userId.toString() === userId.toString()) {
      await CartItem.findByIdAndDelete(cartItemId);
      return { status: 200, message: "Item removed successfully" };
    }
    return { status: 401, message: "Unauthorized" };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findCartItemById(cartItemId) {
  try {
    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) {
      return { status: 404, message: "Item not found" };
    }
    return cartItem;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  removeCartItem,
  updateCartItem,
  findCartItemById,
};
