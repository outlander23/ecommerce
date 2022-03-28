const User = require("../models/user.model");

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(user);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.send("No user found");
    }
    res.json(user);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
};
const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.send("No user found");
    }
    res.json(user);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "User deleted",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { updateUser, getUser, deleteUser, getAllUser };
