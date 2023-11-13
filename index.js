const express = require("express");
const app = express();
const config = require("./config/config")
const userRoute = require("./routes/register.js");

require("./dbconnection");
app.use(express.json());

app.use("/user", userRoute)


app.listen(config.portNo,()=>{
    console.log("server is running");
})