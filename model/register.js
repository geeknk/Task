const { DataTypes } = require("sequelize");
const sequelize = require("../dbconnection");
const address = require("./address");
const User = sequelize.define("User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: "users",
    timestamps: true,
  }
);
User.hasMany(address, {
  foreignKey: 'user_id'
});
// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;
