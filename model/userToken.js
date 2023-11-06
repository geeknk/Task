const mongoose = require("mongoose");
const user = mongoose.Schema({
    token:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model("usertoken",user)