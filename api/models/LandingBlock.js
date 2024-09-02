/**
 * @author : Ibrahim Atef
 * @description : This file contains the LandingBlock Mongo Model
 * @date : 01/09/2024
 *
 * @param {Object} mongoose - The Mongoose module used to create the model.
 * @param {Object} LandingBlockSchema - The Mongoose schema used to create the model.
 * @param {Function} model - The Mongoose model used to create the model.
 *
 */

const mongoose = require("mongoose");

const LandingBlockSchema = new mongoose.Schema(
  {
    img: { type: Buffer, required: true }, // Store image as binary data
    title: { type: String, required: true },
    desc: { type: String },
    contentType: { type: String } // Store the content type of the image (e.g., 'image/png')
  },
  { timestamps: true }
);

module.exports = mongoose.model("LandingBlock", LandingBlockSchema);
