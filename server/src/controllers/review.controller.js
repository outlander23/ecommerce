const Review = require("../models/review.model");
const APIFetures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/product.model");
const createReview = catchAsync(async (req, res) => {
  const { review, rating, productID } = req.body;
  const userID = req.user.id;
  const newReview = await Review.create({ review, rating, userID, productID });
  res.json({ status: "success", data: newReview });
});
const getReview = catchAsync(async (req, res) => {
  const tourID = req.params.tourID;
  res.json({ status: "success", data: tourID });
});
const getAllReview = catchAsync(async (req, res) => {
  // const query = new APIFetures(Review.find(), req.query)
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .pagination();
  const tours = await Review.find();
  console.log("ok ok ok ok");
  res.json({ status: "success", data: tours });
});

module.exports = { createReview, getReview, getAllReview };
