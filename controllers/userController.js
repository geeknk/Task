const config = require("../config/config");
const users = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {updateuser1,getdata,matchpass,modifyPass,verifyemail,userlogin,usersignup,user_list} = require("../services/userservices")

exports.signup = async (req, res) => {
  const data = await usersignup(req.body)
  if(data){
    res.status(201).send({ success: true, msg:"User registered successfully", data: data });
  }
};

exports.login_user = async (req, res) => {
  const loggedin = await userlogin(req.body)
  if (!loggedin) {
    return res.status(401).send({ success: false, msg: "Email or Password is wrong" });
  } else {
    res.status(200).send(loggedin);
  }
};

exports.changePass = async (req, res) => {
  const validpass = await matchpass(req.body)
  if(!validpass){
    return res.status(401).send({success: "failed", message: "password doesn't match" });
  }try {
    modifyPass(req.data.email,req.body);
    res.status(201).send({success: "true", message: "password changed" });
  } catch (error) {
    res.status(401).send({success: "false", message: "password is not changed" });
  }
};

exports.verifyuser = async(req,res) => {
  const validuser = await verifyemail(req.body)
  if(!validuser){
    res.status(401).send({success: "false", message: "user doesn't exist" });
  }else{
    res.status(201).send({success: "true", message: "user exist" });
  }
};

exports.forgetPass = async (req, res) => {
  const validpass = await matchpass(req.body)
  if(!validpass){
    return res.status(401).send({success: "failed", message: "password doesn't match" });
  }try {
    modifyPass(req.data.email,req.body);
    res.status(201).send({success: "true", message: "password updated" });
  } catch (error) {
    res.status(401).send({success: "false", message: "password is not updated" });
  }
};

exports.updateuser = async (req, res) => {
  try {
    await updateuser1(req.data.email , req.body);
    res.status(201).send({success: "true", message: "user updated successfully" });
  } catch (error) {
    res.status(402).send({success: "false", message: "user not updated" });
  } 
};

//get user data with the help of token (without body)

exports.getuser = async (req, res) => {
  try {
    const userData = await getdata(req.data.email);
    res.send(userData)
  } catch (error) {
    console.log(error)
    res.status(402).send(error);
  }
};

//get user data with the help of token (without email)

exports.deluser = async (req, res) => {
  try {
    await deleteuser(req.data.email);
    res.status(201).send({success: "true", message: "user deleted" });
  } catch (error) {
    console.log(error)
    res.status(402).send(error);
  }
};

// get user in the form of list (page wise)

exports.userlist = async (req, res) => {
  try{
    const data = await user_list(req.params.page)
    if(data){
      res.status(201).send({success: "true", message: data });
    }
  }catch(error){
    res.status(401).send({success: "false", message: "userdata not found" ,error});
  }
};