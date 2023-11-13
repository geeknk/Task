const mongoose=require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const user = mongoose.Schema({
    user_id:{
        type: ObjectId,
        ref: "users",
        required: true,
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
},
{timestamps:true}
);

module.exports = mongoose.model("useraddress",user)