const { DataTypes } = require("sequelize");
const sequelize = require("../dbconnection");

const userToken = sequelize.define("userToken",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: "userToken",
    timestamps: true,
  }
);

module.exports = userToken;