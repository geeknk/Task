const express = require("express");
const {register_user,login_user, changePass} = require("../controllers/userController");
const router = express.Router();
const mid_register = require("../middleware/mid_register")
const userController = require("../controllers/userController")


// Route level middleware
router.use('/changePassword',mid_register.checkAuth)
router.use('/updateuser',mid_register.checkAuth)

router.get("/register",mid_register.REG_MIDDLE,userController.register_user);
router.post("/auth/signin",userController.login_user);
router.put("/changePassword",userController.changePass);
router.put("/forgetpassword",userController.forgetPass);
router.put("/updateuser",userController.updateuser);

module.exports=router;