const users = require("../model/userModel");
const bcrypt = require("bcryptjs");



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

module.exports = register_user