const Product = require("../models/product.model");
const APIFetures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(product);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");
    if (!product) {
      return res.send("No product found");
    }
    res.json(product);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
};
const getAllProducts = catchAsync(async (req, res) => {
  const query = new APIFetures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const products = await query.query;
  res.json({
    status: "success",
    data: products,
  });
});

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Product deleted",
    });
  } catch (e) {
    console.log(e);
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      sizes,
      color,
      quantity,
      photos,
    } = req.body;
    const product = await Product.create({
      title,
      price,
      sizes,
      color,
      description,
      category,
      quantity,
      photos,
    });
    res.json({
      status: "success",
      data: product,
    });
  } catch (e) {
    console.log(e);
  }
};

const getProductStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $unwind: "$sizes",
      },
      {
        $match: {
          price: {
            $gte: 10,
          },
        },
      },
      {
        $group: {
          _id: "$sizes",
          count: { $sum: 1 },
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" },
        },
      },
    ]);

    res.json({ status: "success", data: stats });
  } catch (err) {}
};

module.exports = {
  updateProduct,
  getProduct,
  deleteProduct,
  getAllProducts,
  createProduct,
  getProductStats,
};
