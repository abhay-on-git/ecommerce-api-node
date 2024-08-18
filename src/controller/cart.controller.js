const cartService = require("../services/cart.service");

const findUserCart = async (req, res) => {
  const user = req.user;
  const userId = user._id.toString()
  try {
    const cart = await cartService.findUserCart(userId);
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ error: error.message +"eeeeeee" });
  }
};

const addItemToCart = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartService.addCartItem(user._id, req.body);
    return res.status(200).send("Item added to Cart");
  } catch (error) {
    return res.status(500).send({ error: error.message + "eeeee" });
  }
};

module.exports = { findUserCart, addItemToCart };
