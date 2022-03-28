const express = require("express");
const { payment } = require("../controllers/paymentcontroller");
const paymentRouter = express.Router();

paymentRouter.route("/").post(payment);

module.exports = paymentRouter;
