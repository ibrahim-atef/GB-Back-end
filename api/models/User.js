/**
 * @author : Ameer Heiba
 * @description : This file contains the User Mongo Model
 * @date : 27/09/2022
 * 
 * @param {Object} mongoose - The Mongoose module used to create the model.
 * @param {Object} UserSchema - The Mongoose schema used to create the model.
 * @param {Function} model - The Mongoose model used to create the model.
 * 
 */





const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    profilePic: { type: String, defaut: "" },
    isAdmin: { type: Boolean, default: false },
    isModerator: { type: Boolean, default: false },
    isPrime: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);