const sequelize = require("../assets/SQLDB/db").sqlDB;
const { DataTypes } = require("sequelize");
const User = require("./User");
const Permission = require("./Permission");

const Role = sequelize.define("Role", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true
  });
  
  // Set up associations
  Role.hasMany(User, { foreignKey: 'roleId' });
  User.belongsTo(Role, { foreignKey: 'roleId' });
  
  module.exports = Role;
  
  