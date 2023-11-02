const env = require("dotenv");
env.config();

const portNo = process.env.PORT_NO
const secretKey = process.env.SECRET_KEY
const db_url = process.env.DB_URL



module.exports = {
    portNo,
    secretKey,
    db_url
}