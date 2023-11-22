const express = require("express");
const app = express();
const config = require("./config/config")
const userRoute = require("./routes/register.js");
const User = require("./model/register");

require("./dbconnection");
app.use(express.json());

app.use("/user", userRoute)

User.sync()

app.listen(config.portNo,()=>{
    console.log("server is running");
})