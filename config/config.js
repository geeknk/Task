const env = require("dotenv");
env.config();

exports.portNo = process.env.PORT_NO
exports.secretKey = process.env.SECRET_KEY
exports.db_url = process.env.DB_URL
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRY
exports.FPASS_EXPIRESIN = process.env.FPASS_EXPIRY
exports.API_KEY = process.env.APIKEY
exports.EMAIL_FROM = process.env.emailFrom
exports.EMAIL_TO = process.env.emailTo