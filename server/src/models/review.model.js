const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userID",
    select: "name photo username",
  }).populate({
    path: "productID",
    select: "name photo title ",
  });
  next();
});
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
