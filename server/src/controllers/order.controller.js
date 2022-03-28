const Order = require("../models/order.model");

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(order);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.send("No Order found");
    }
    res.json(order);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!Order) {
      return res.send("No Order found");
    }
    res.json(orders);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
};
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Order deleted",
    });
  } catch (e) {
    console.log(e);
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
    });
    res.json({
      status: "success",
      data: Order,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  updateOrder,
  getOrder,
  deleteOrder,
  getAllOrders,
  createOrder,
};
