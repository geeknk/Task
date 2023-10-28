const express = require("express");
const register_user = require("../controllers/userController");
const router = express.Router();



const mid_register = require("../middleware/mid_register");

router.post("/register",mid_register,register_user);

module.exports=router;