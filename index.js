// require("dotenv").config()
const config = require("./config/config")
const express = require("express");
const app = express();

require("./dbconnection");
app.use(express.json())
const userRoute = require("./routes/register.js");

app.use("/user", userRoute)


app.listen(config.portNo,()=>{
    console.log("server is running");
})