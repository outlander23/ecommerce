var cors = require("cors");

const express = require("express");
const {
  authRouter,
  userRouter,
  productRouter,
  paymentRouter,
  reviewRouter,
} = require("./routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/payment", paymentRouter);

module.exports = app;
