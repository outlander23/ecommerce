const express = require("express");
const orderRouter = express.Router();
const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");
orderRouter.route("/").get(getAllOrders).post(createOrder);
orderRouter.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = orderRouter;
