const mongoose = require("mongoose");
const users = mongoose.model("users");
const REG_MIDDLE = async (req, res, next) => {
    const userData = await users.findOne({ email: req.body.email });

  if (userData) {
    return res.status(409).send({ success: false, msg: "Email already exist" });
  } else {
    next();
  }
};

module.exports = REG_MIDDLE;
