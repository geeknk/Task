const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../model/userModel");
const userToken = require("../model/userToken");
const useradd = require("../model/address");
const multer = require("multer")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  requireTLS:true,
  auth:{
    user:"ernitish26@gmail.com",
    pass: "password"
  }
});

const getdata= async (id)=>{
    return await users.findOne({_id:id}).populate("address")
}

const deleteuser = async ()=>{
    const data = await users.findOneAndDelete(req.data.email);
  if (data) {
    res.status(200).send({success: "true", message: "User deleted" });
  }
}

const updateuser1 = async (data, body_data)=>{
    await users.updateOne(data.email, body_data);
}

const matchpass = async (data) => {
    return data.password===data.new_password
}

const verifyemail = async (data) =>{
    const emailexist = await users.findOne({ email: data.email });

    if(emailexist){
    const token = jwt.sign(
        { email: emailexist.email, id: emailexist._id },
        config.secretKey,
        {expiresIn:config.FPASS_EXPIRESIN}
      );

      const mailOption ={
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: "Password Reset",
        html: <link>token</link>
      }
      transporter.sendMail(mailOption);
      return token;
    }else{
        return false
    }
}

const modifyPass = async(email,data) =>{
    await users.updateOne(
        { email },
        {
            password: data.password,
        }
    ); 
    const mailOption ={
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: "Password Reset",
      text: "Password Reset successfully"
    }
    transporter.sendMail(mailOption);
}

const userlogin = async(data) =>{
    const userData = await users.findOne({ email: data.email });
    const pass = bcrypt.compare(userData.password , data.password)

    if(pass && userData){
        const token = jwt.sign(
            { email: userData.email, id: userData._id },
            config.secretKey,
            {expiresIn:config.JWT_EXPIRES_IN}
        );
        let user = new userToken({
          userId:userData._id,
          token: token,
          expiry: config.JWT_EXPIRES_IN
        });
        await user.save();
        console.log("token saved");
        return token;
    }else{
        return false
    }
}

const usersignup = async(data) =>{
    let user = new users({
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        address: data.address,
      });
      if(user){
        const registered = await user.save();
        const mailOption ={
          from: config.EMAIL_FROM,
          to: config.EMAIL_TO,
          subject: "Registration",
          text: "You Have been Registered successfully"
        }
        transporter.sendMail(mailOption);
        return registered;
      }else{
        return false;
      }
};

const user_list = async (page)=>{
    const firstindex = (page - 1)*10;
    const lastindex = page *10;
    const data= await users.find();
    const sliced_data = data.slice(firstindex, lastindex);
    return sliced_data;
}

const useraddress = async (data,ID) => {
    try {
      let userAdd = new useradd({
        user_id: ID,
        address: data.address,
        city: data.city,
        state: data.state,
        pin_code: data.pin_code,
        phone: data.phone
      });
      if(userAdd){
        await userAdd.save();

        await users.findByIdAndUpdate(
          ID,
          { $push: { address: userAdd._id } },
          { new: true, upsert: true }
         );
     return true
      }else{
        return false;
      }
    } catch (error) {
      console.error(error)
    }
};
module.exports={
    getdata,
    deleteuser,
    updateuser1,
    modifyPass,
    matchpass,
    verifyemail,
    user_list,
    userlogin,
    usersignup,
    useraddress,
}