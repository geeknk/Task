const env = require("dotenv");
env.config();

const portNo = process.env.PORT_NO
const secretKey = process.env.SECRET_KEY



module.exports = {
    portNo,
    secretKey
}