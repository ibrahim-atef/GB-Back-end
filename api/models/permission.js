const sequelize = require("../assets/SQLDB/db").sqlDB;
const { DataTypes } = require("sequelize");

const Permission = sequelize.define("Permission", {
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['create', 'update', 'delete', 'view']]
    }
  },
  resource: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Permission;
