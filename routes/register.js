const express = require("express");
const router = express.Router();

const Controller = require("../controllers/userController");

router.post("/",Controller);

module.exports=router;