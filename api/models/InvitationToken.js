// models/InvitationToken.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../assets/SQLDB/db").sqlDB;

const InvitationToken = sequelize.define("InvitationToken", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false, // e.g., "admin" or "moderator"
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  timestamps: true
});

module.exports = InvitationToken;
