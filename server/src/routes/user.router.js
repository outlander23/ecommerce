const express = require("express");
const userRouter = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");
const {
  updateUser,
  getUser,
  deleteUser,
  getAllUser,
} = require("../controllers/user.controller");

userRouter
  .route("/:id")
  .put(verifyTokenAndAuthorization, updateUser)
  .get(verifyTokenAndAuthorization, getUser)
  .delete(deleteUser);
userRouter.route("/").get(verifyTokenAndAdmin, getAllUser);

module.exports = userRouter;
