const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const cartRouter = require("./cart.router");
const orderRouter = require("./order.router");
const productRouter = require("./product.router");
const paymentRouter = require("./payment.router");
const reviewRouter = require("./review.router");
module.exports = {
  authRouter,
  cartRouter,
  orderRouter,
  productRouter,
  userRouter,
  paymentRouter,
  reviewRouter,
};
