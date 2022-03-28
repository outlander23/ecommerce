const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const stripeRoter = express.Router();

module.exports = stripeRoter;
