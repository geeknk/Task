const express = require("express");
const router = express.Router();
const midCheck = require("../middleware/mid_register")
const userController = require("../controllers/userController")

router.get("/register",midCheck.REG_MIDDLE,userController.signup);
router.get("/get",midCheck.checkAuth,userController.getuser);
router.get("/list/:page",userController.userlist);
router.post("/auth/signin",userController.loginUser);
router.post("/address",midCheck.checkAuth,userController.user_address);
router.put("/changePassword",midCheck.checkAuth,userController.changePass);
router.put("/verify-reset-password",midCheck.checkAuth,userController.forgetPass);
router.put("/updateuser",midCheck.checkAuth,userController.updateuser);
router.put("/delete",midCheck.checkAuth,userController.deluser);
router.post("/forgot-password",userController.verifyuser);
router.put("/profile-image",midCheck.upload,userController.profileImg);
router.post("/fetch/flipkart/mobile",userController.flipkartMob);
router.post("/fetch/flipkart/mobile/all",userController.flipkartAllMob);
router.post("/fetch/snapdeal/t-shirt",userController.snapdealTshirt);

module.exports=router;