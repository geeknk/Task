require("dotenv").config();
const mongoose = require("mongoose");
const users = mongoose.model("users");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.REG_MIDDLE = async (req, res, next) => {
  const userData = await users.findOne({ email: req.body.email });

  if (userData) {
    return res.status(409).send({ success: false, msg: "Email already exist" });
  } else {
    next();
  }
};

exports.checkAuth = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    const {email}=jwt.verify(token, config.secretKey, async (err, authData) => {
      if (err) {
        res.send({ result: "invalid token" });
      }
    });
    req.data= {email, token}
    next();
  } else {
    res.send({
      result: "Token is not valid",
    });
  }
};
