const Cart = require("../models/cart.model");
const catchAsync = require("../utils/catchAsync");
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(cart);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.send("No Cart found");
    }
    res.json(cart);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
};
const getAllCarts = catchAsync(async (req, res) => {
  const query = req.query;
  res.send(query);
});
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Cart deleted",
    });
  } catch (e) {
    console.log(e);
  }
};

const createCart = async (req, res) => {
  try {
    const Cart = await Cart.create({
      ...req.body,
    });
    res.json({
      status: "success",
      data: Cart,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  updateCart,
  getCart,
  deleteCart,
  getAllCarts,
  createCart,
};
