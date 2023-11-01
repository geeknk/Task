require("dotenv").config();
const mongoose = require("mongoose");
const users = mongoose.model("users");
const jwt = require("jsonwebtoken");

exports.REG_MIDDLE = async (req, res, next) => {
  const userData = await users.findOne({ email: req.body.email });

  if (userData) {
    return res.status(409).send({ success: false, msg: "Email already exist" });
  } else {
    next();
  }
};

exports.checkAuth = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  }else{
    res.send({
      result:"Token is not valid"
    })
  }
  
};