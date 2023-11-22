const mongoose=require("mongoose");
const user = mongoose.Schema({
    name:{
        name: String,
    },
    country:{
        type:String
    },
    region:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    currency:{
        type:Number
    },
    numberrange:{
        type:Number
    },
    postalZip:{
        type:Number
    }
}
);

module.exports = mongoose.model("dummydatas",user)