const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(userId) {
  try {
    const cart = await Cart.findOne({ user: userId });
    const cartItems = await CartItem.find({ cart: cart._id }).populate(
      "products"
    );
    cart.cartItems = cartItems;
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
      (totalItem += cartItem.quantity),
        (totalPrice += cartItem.price),
        (totalDiscountedPrice += cartItem.discountedPrice);
    }
    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discount = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addCartItem(userId, req) {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId);
    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });
    if (!isPresent) {
      const CartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });
      const createdCartItem = await CartItem.save();
      cart.cartItems.push(createdCartItem._id);
      await cart.save();
      return res.json("item added to cart");
    }
    return res.json('Item is Already in the cart')
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createCart,
  addCartItem,
  findUserCart
};
