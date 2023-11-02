const mongoose = require("mongoose");
const { db_url } = require("./config/config");

const db_connect = async ()=>{
    try {
        await mongoose.connect(db_url)
        console.log("Database connected");
    } catch (error) {
        console.log("DB connection failed");
    }
}
db_connect();