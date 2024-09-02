/**
 * @author : Ameer Heiba
 * @description : This file contains the User Sequelize Model
 * @date : 28/08/2024
 * 
 * @param {Object} Sequelize - The Sequelize module used to create the model.
 * @param {Object} DataTypes - The DataTypes module used to create the model.
 * @param {Object} User - The User model used to create the model.
 * @param {Object} sequelize - The Sequelize connection used to create the model.
 * 
 * 
 * 
 */



const {Sequelize, DataTypes} = require("sequelize");

const sequelize = require("../assets/SQLDB/db");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isModerator: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isPrime: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
},
}, {
  timestamps: true
});

module.exports = User;









