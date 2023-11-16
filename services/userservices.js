const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../model/userModel");
const userToken = require("../model/userToken");
const useradd = require("../model/address");
const multer = require("multer")
const nodemailer = require("nodemailer")
const axios = require("axios");
const Cheerio =require("cheerio");


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
        subject: "Password Reset Link",
        html: '<link>'+token+'</link>'
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

const flipkart = async ()=>{
  const movie = [];
  try{
  await axios.get(config.URL)
  .then((response)=>{
    let $ = Cheerio.load(response.data);
    $('._2n7i6c').each(function(el, index){
      const name = ($(this).find('a._2rpwqI').attr('title'));
      const price = ($(this).find('div._30jeq3').text());
      const link = ($(this).find('a.s1Q9rs').attr('href'));
      const rating = ($(this).find('div._3LWZlK').text());
      const discount = ($(this).find('div._3Ay6Sb').text().split(" ")[0]);

      movie.push({product_name:name, price:price, rating:rating, discount:discount, link:link})      
    });
  })}catch(error){
    console.log(error);
  }
  return movie
};

// Function to scrape the category page and get product URLs
async function scrapeCategoryPage(categoryUrl) {
  try {
    const response = await axios.get(categoryUrl);
    const productUrls = [];

    const $ = Cheerio.load(response.data);
    
    $('a.s1Q9rs').each((index, element) => {
      const productUrl = $(element).attr('href');
      productUrls.push(productUrl);
      console.log(productUrls);
    });

    return productUrls;
  } catch (error) {
    console.error('Error scraping category page:', error.message);
    throw error;
  }
}

const flipkartAll = async ()=>{

  const movie = [];
  try{
  await axios.get(config.URL1)
  .then((response)=>{
    let $ = Cheerio.load(response.data);
    $('._2kHMtA').each(function(el, index){
      const name = ($(this).find('._4rR01T').text());
      const productUrl = ($(this).find('a._1fQZEK').attr('href'));

      movie.push({product_name:name,link:productUrl})
    });
  })}catch(error){
    console.log(error);
  }
  return movie

};
const snapdeal = async ()=>{
  const Tshirt = []
  try{
  await axios.get(config.snapURL)
  .then((response)=>{
    let $ = Cheerio.load(response.data);
    $('.favDp.product-tuple-listing.js-tuple').each(function(el, index){
      const name = ($(this).find('p.product-title').attr('title'));
      const price = ($(this).find('span.product-price').text());
      const link = ($(this).find('a.dp-widget-link').attr('href'));
      const image = ($(this).find('img.product-image').attr('src'));
      const discount = ($(this).find('.product-discount span').text().split(" ")[0]);
      Tshirt.push({product_name:name, image:image, price:price, discount:discount, link:link})      
      console.log(Tshirt);
    });
  })}catch(error){
    console.log(error);
  }
  return Tshirt
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
    flipkart,
    flipkartAll,
    snapdeal
}