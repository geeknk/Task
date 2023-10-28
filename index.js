require("dotenv").config()
const express = require("express");
const app = express();

require("./dbconnection");
app.use(express.json())
const userRoute = require("./routes/register");

app.use("/user", userRoute)


app.listen(process.env.PORT_NO,()=>{
    console.log("server is running on port 3005");
})