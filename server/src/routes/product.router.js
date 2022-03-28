const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  getProductStats,
} = require("../controllers/product.controller");

const { verifyTokenAndAdmin } = require("../utils/verifyToken");
const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(verifyTokenAndAdmin, createProduct);

productRouter.route("/stats").get(getProductStats);
productRouter
  .route("/:id")
  .get(getProduct)
  .delete(deleteProduct)
  .put(verifyTokenAndAdmin, updateProduct);

module.exports = productRouter;
