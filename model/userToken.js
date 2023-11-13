const mongoose = require("mongoose");
const user = mongoose.Schema({
    userId:{
        type:Object
    },
    token:{
        type:String,
        required:true
    },
    expiry:{
        type:String
    }
});

module.exports = mongoose.model("usertoken",user)