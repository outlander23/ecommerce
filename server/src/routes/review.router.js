const express = require("express");
const {
  createReview,
  getAllReview,
  getReview,
} = require("../controllers/review.controller");

const { verifyTokenAndAuthorization } = require("../utils/verifyToken");

const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .get(getAllReview)
  .post(verifyTokenAndAuthorization, createReview);

reviewRouter.route("/:tourID").get(getReview);

module.exports = reviewRouter;
