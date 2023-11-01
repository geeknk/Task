const config = require("../config/config")
const users = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register_user = async (req, res) => {
  const salt = 10;
  const spassword = await bcrypt.hash(req.body.password, salt);

  let user = new users({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: spassword,
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
    return res
      .status(401)
      .send({ success: false, msg: "Email or Password is wrong" });
  }
};

exports.changePass = async (req, res) => {
  const { email } = jwt.verify(
    req.token,
    config.secretKey,
    async (err, authData) => {
      if (err) {
        res.send({ result: "invalid token" });
      } else {
        const { password, new_password } = req.body;
        if (password && new_password) {
          if (password !== new_password) {
            res.send({ status: "failed", message: "password dose not match" });
          } else {
            const salt = 10;
            const spassword = await bcrypt.hash(req.body.password, salt);

            await users.updateOne(email, {
              password: spassword,
            });
            res.send({ status: "true", message: "password updated" });
          }
        } else {
          req.send({ status: "failed", message: "All fields are required" });
        }
      }
    }
  );
};
