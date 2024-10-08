const sequelize = require("../assets/SQLDB/db").sqlDB;
const { DataTypes } = require("sequelize");

const Permission = sequelize.define("Permission", {
    action: {
      type: DataTypes.STRING, // e.g., 'create', 'update', 'delete', 'view'
      allowNull: false
    },
    resource: {
      type: DataTypes.STRING, // e.g., 'movie', 'series'
      allowNull: false
    }
  }, {
    timestamps: true
  });
  
  module.exports = Permission