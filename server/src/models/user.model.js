require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cryptoJS = require("crypto-js");
const JWT_SECRET = process.env.JWT_SECRET;
const SECRET_PHASES = process.env.SECRET_PHASES;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    resetPasswordToken: String,
    resetPasswordTokenTimeout: Date,
  },
  {
    timestamps: true,
  }
);
/*************/
// plugin
/*************/

/*************/
// Pre
/*************/
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = cryptoJS.AES.encrypt(this.password, SECRET_PHASES);
  }
  next();
});

/*************/
// Methods
/*************/
userSchema.methods.createJWT = function () {
  const user = this;
  return jwt.sign(
    {
      username: user._id,
      id: user._id,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};

userSchema.methods.createResetpasswordToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetPasswordTokenTimeout = Date.now() + 10 * 60 * 1000;

  return token;
};

userSchema.methods.checkResetPasswordToken = function () {
  return this.resetPasswordTokenTimeout >= Date.now();
};

userSchema.methods.checkPassword = function (candidatePassword) {
  const decryptedPassword = cryptoJS.AES.decrypt(
    this.password,
    SECRET_PHASES
  ).toString(cryptoJS.enc.Utf8);
  return decryptedPassword === candidatePassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
