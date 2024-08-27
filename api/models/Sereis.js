/**
 * @author : Alaa Ayaad
 * @description : This file contains the Series Mongo Model
 * @date : 28/09/2024
 *
 * @param {Object} mongoose - The Mongoose module used to create the model.
 * @param {Object} SeriesSchema - The Mongoose schema used to create the model.
 * @param {Function} model - The Mongoose model used to create the model.
 *
 */

const mongoose = require("mongoose");

const SeriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    seasons: { type: Number, required: true },
    episode: { type: Number, required: true },
    coverPic: { type: String, defaut: "" },
    yearOfPublish: { type: Number, required: true },
    trailer: { type: String, required: true },
    video: { type: String, required: true },
    rate: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Series", SeriesSchema);
