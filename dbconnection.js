const { Sequelize } = require("sequelize");
const config = require("./config/config");

const sequelize = new Sequelize(config.DB, 'root',config.PASS, {
  host: 'localhost',
  dialect: 'mysql',
});

const connectdb= async () => {
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
}
connectdb();

module.exports = sequelize