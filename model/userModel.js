const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const user = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
});

user.pre('save',async function(next){
    try {
        const salt = 10;
        const hashedpassword = await bcrypt.hash(this.password, salt);
        this.set("password",hashedpassword)
        next()
    } catch (error) {
        next(error)
    } 
});

module.exports = mongoose.model("users",user)