const express = require("express");
const authRouter = express.Router();
const {
  register,
  login,
  resetPassword,
  forgetPassword,
} = require("../controllers/auth.controller");

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/resetpassword/:token").post(resetPassword);
authRouter.route("/forgetpassword").post(forgetPassword);

module.exports = authRouter;
