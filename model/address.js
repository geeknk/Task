const { DataTypes } = require("sequelize");
const sequelize = require("../dbconnection");
const address = sequelize.define("address",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pin_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "address",
    timestamps: true,
  }
);

module.exports = address;