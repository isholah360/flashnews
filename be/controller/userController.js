const Bloger = require("../db/bloger");
const Post = require("../db/posts");
const User = require("../db/userdb");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middle/error");
const bcryptjs = require("bcryptjs");

const user  = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await Bloger.findById(userId);

    const { password: hashedPassword, ...newUpdte } = user._doc;

    res.status(200).json( newUpdte);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = {user}