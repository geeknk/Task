const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../model/userModel");
const userToken = require("../model/userToken");
const useradd = require("../model/address");

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
        {expiresIn:config.JWT_EXPIRES_IN}
      );
      let user = new userToken({
        token: token
      });
      await user.save();
      console.log("token saved");
      return true
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
}

const userlogin = async(data) =>{
    const userData = await users.findOne({ email: data.email });
    const pass = bcrypt.compare(userData.password , data.password)

    if(pass && userData){
        const token = jwt.sign(
            { email: userData.email, id: userData._id },
            config.secretKey
        );
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
        return await user.save();
      }else{
        return false;
      }
};

const user_list = async (page)=>{
    firstindex = (page - 1)*10;
    lastindex = page *10;
    const data= await users.find();
    const sliced_data = data.slice(firstindex, lastindex);
    return sliced_data;
}

const useraddress = async (data,ID) => {
    let user = new useradd({
        user_id: ID,
        address: data.address,
        city: data.city,
        state: data.state,
        pin_code: data.pin_code,
        phone: data.phone
      });
      if(user){
        await user.save();
        // await user.findByIdAndUpdate({})
      }else{
        return false;
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
    useraddress
}