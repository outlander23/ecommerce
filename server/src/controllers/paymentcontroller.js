require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const payment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/success`,
    cancel_url: `${req.protocol}://${req.get("host")}/cancel/`,
    customer_email: "smmiloy23@gmail.com",
    client_reference_id: "4357983475987349578",
    line_items: [
      {
        name: `Test`,
        description: `Test tour tour tour tour test data`,
        images: [
          `https://www.pexels.com/photo/person-holding-a-phone-8947145/`,
        ],
        amount: 1000,
        currency: "usd",
        quantity: 1,
      },
    ],
  });
  res.json({
    status: "success",
    data: session,
  });
};

module.exports = {
  payment,
};
