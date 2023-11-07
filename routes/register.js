const express = require("express");
const {register_user,login_user, changePass} = require("../controllers/userController");
const router = express.Router();
const mid_register = require("../middleware/mid_register")
const userController = require("../controllers/userController")


// Route level middleware
router.use('/changePassword',mid_register.checkAuth)
router.use('/updateuser',mid_register.checkAuth)
router.use('/get',mid_register.checkAuth)
router.use('/delete',mid_register.checkAuth)
router.use('/address',mid_register.checkAuth)
router.use('/verify-reset-password',mid_register.checkAuth)

router.get("/register",mid_register.REG_MIDDLE,userController.signup);
router.get("/get",userController.getuser);
router.get("/list/:page",userController.userlist);
router.post("/auth/signin",userController.login_user);
router.post("/address",userController.user_address);
router.put("/changePassword",userController.changePass);
router.put("/verify-reset-password",userController.forgetPass);
router.put("/updateuser",userController.updateuser);
router.put("/delete",userController.deluser);
router.post("/forgot-password",userController.verifyuser);

module.exports=router;