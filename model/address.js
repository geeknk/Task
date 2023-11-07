const mongoose=require("mongoose");
const userModel = require("./userModel");
const user = mongoose.Schema({
    user_id:{
        type:'ObjectId',
        required:true,
        ref: 'userModel'
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pin_code:{
        type:Number
    },
    phone:{
        type:Number
    }
});

module.exports = mongoose.model("useraddress",user)