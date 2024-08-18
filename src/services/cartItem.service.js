const userService = require("../services/user.service");
const CartItem = require("../models/cartItem.model");
const User = require("../models/user.model");

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const item = await CartItem.findById(cartItemId).populate("product");
    
    if (!item) {
      return { status: 404, message: "Item not found" };
    }
    
    const user = await userService.findUserById(item.userId);
    
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    
    if (user._id.toString() === userId.toString()) {
      const quantity = Number(cartItemData.quantity);
      if (isNaN(quantity)) {
        throw new Error('Invalid data for quantity');
      }

      let totalDiscountedPrice = 0;
      let totalPrice = 0;

      // Loop through each product to calculate total price and discounted price
      item.product.forEach(prod => {
        const pricePerUnit = Number(prod.price);
        const discountedPricePerUnit = Number(prod.discountedPrice);

        if (isNaN(pricePerUnit) || isNaN(discountedPricePerUnit)) {
          throw new Error('Invalid data for price or discountedPrice');
        }

        totalPrice += quantity * pricePerUnit;
        totalDiscountedPrice += quantity * discountedPricePerUnit;
      });

      item.quantity = quantity;
      item.price = totalPrice;
      item.discountedPrice = totalDiscountedPrice;

      const updatedCartItem = await item.save();
      return updatedCartItem;
    }
    
    return { status: 401, message: "Unauthorized" };
  } catch (error) {
    throw new Error(error.message);
  }
}


async function removeCartItem(userId, cartItemId) {
  try {
    const cartItem = await CartItem.findById(cartItemId);
    if(!cartItem){
      return { status: 404, message: "Item not found" };
    }
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
