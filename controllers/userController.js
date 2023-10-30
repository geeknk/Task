require("dotenv").config();
const users = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const register_user= async (req,res)=>{
    try {
            const salt = 10;
            const spassword = await bcrypt.hash(req.body.password,salt);

            let user = new users({
                username:req.body.username,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:spassword,
                // password:req.body.password,
                mobile:req.body.mobile,
                address:req.body.address
            });
            const user_data = await user.save();
            return res.status(200).send({success:true,data:user_data})
            
    } catch (error) {
        res.status(400).send({success:false,error:error.message})
    }
}

const login_user = async (req,res) => {
    try {
        const userData = await users.findOne({email: req.body.email});
        const pass = bcrypt.compare(userData.password, req.body.password);
        
        const token = jwt.sign({email:userData.email,id:userData._id},process.env.SECRET_KEY)

          if (userData && pass) {
            res.status(200).send(token);
          } else {
            return res.status(401).send({ success: false, msg: "Email or Password is wrong" });
          }
    } catch (error) {
        res.status(400).send({success:false,error:error.message})
    }
}

module.exports = {register_user,login_user}