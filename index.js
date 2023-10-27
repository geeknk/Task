const express = require("express");
const app = express();

require("./dbconnection");
app.use(express.json())
const userRoute = require("./routes/register");

app.use("/user/register", userRoute)


app.listen(3005,()=>{
    console.log("server is running on port 3005");
})