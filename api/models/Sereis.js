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
    seasons: { type: Array, required: true },
    episodes: { type: Array, required: true },
    coverPic: { type: String, default: "" },
    yearOfPublish: { type: Number, required: true },
    trailer: { type: String, required: true },
    video: { type: String, required: true },
    rating: { type: Number },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Series", SeriesSchema);
