require("dotenv").config();
const mongoose = require("mongoose");
const PASSWORD = process.env.PASSWORD;
const URL = process.env.MONGODB_URL;
const url = URL.replace("<password>", PASSWORD);
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to database");
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;
