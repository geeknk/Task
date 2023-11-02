const config = require("../config/config");
const users = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register_user = async (req, res) => {
  let user = new users({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    address: req.body.address,
  });
  const user_data = await user.save();
  return res.status(200).send({ success: true, data: user_data });
};

exports.login_user = async (req, res) => {
  const userData = await users.findOne({ email: req.body.email });
  const pass = bcrypt.compare(userData.password, req.body.password);
  const token = jwt.sign(
    { email: userData.email, id: userData._id },
    config.secretKey
  );

  if (userData && pass) {
    res.status(200).send(token);
  } else {
    return res.status(401).send({ success: false, msg: "Email or Password is wrong" });
  }
};

exports.changePass = async (req, res) => {
  const { password, new_password } = req.body;
  if (password && new_password) {
    if (password !== new_password) {
      res.send({ status: "failed", message: "password dose not match" });
    } else {
      await users.updateOne(req.data.email, {
        password: password,
      });
      res.send({
        status: "true",
        message: "password reset successfully",
      });
    }
  } else {
    req.send({ status: "failed", message: "All fields are required" });
  }
};
exports.forgetPass = async (req, res) => {
  const { password, new_password, email } = req.body;
  const userData = await users.findOne({ email: email });
  if (userData) {
    if (password && new_password) {
      if (password !== new_password) {
        res.send({ status: "failed", message: "password dose not match" });
      } else {

        await users.updateOne(
          { email },
          {
            password: password,
          }
        );
        res.send({ status: "true", message: "password updated" });
      }
    } else {
      req.send({ status: "failed", message: "All fields are required" });
    }
  } else {
    res.send("account dosen't exist");
  }
};

exports.updateuser = async (req, res) => {
  const { username, firstname, lastname, password, mobile, uemail, address } = req.body;

  await users.updateOne(req.data.email, {
    username: username,
    firstname: firstname,
    lastname: lastname,
    password: password,
    mobile: mobile,
    email: uemail,
    address: address,
  });
  res.send({ status: "true", message: "user updated successfully" });
};
