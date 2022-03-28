const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: [String],
    price: {
      type: Number,
      required: true,
    },
    sizes: [String],
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    color: [String],
    photos: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "productID",
  localField: "_id",
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
