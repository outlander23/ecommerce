require("dotenv").config();
const crypto = require("crypto");
const cryptoJS = require("crypto-js");
const Email = require("../utils/email");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const SECRET_PHASES = process.env.SECRET_PHASES;

const register = catchAsync(async (req, res) => {
  const { username, password, email } = req.body;
  let errors = {};
  const newUser = await User.create({ username, password, email });
  res.status(201).json({
    status: "success",
    "x-auth-token": newUser.createJWT(),
    data: newUser,
  });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    res.send("Wrong username or password");
  }
  const isCorrectPassword = user.checkPassword(password);
  if (!isCorrectPassword) {
    res.send("Wrong username or password");
  }
  if (isCorrectPassword)
    res.json({
      succes: "success",
      "x-auth-token": user.createJWT(),
      data: user,
    });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.params.token;

  const decryptPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({ resetPasswordToken: decryptPasswordToken });
  if (!user || !user.checkResetPasswordToken()) {
    res.send("Token is not valid or expired");
  } else {
    user.password = req.body.password;
    user.passwordChangedAt = Date.now();
    await user.save();
    res.json({ status: "success", data: user });
  }
});

const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    next(new AppError("No user found", 401));
  }
  const token = user.createResetpasswordToken();
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/resetpassword/${token}`;
  user.save();
  await new Email(user, resetURL).sendPasswordReset();
  res.send(token);
});

module.exports = {
  register,
  login,
  resetPassword,
  forgetPassword,
};
