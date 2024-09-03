/**
 * @author : Shehab gamal
 * @description : This file contains the TvShow Mongo Model
 * @date : 27/09/2022
 *
 * @param {Object} mongoose - The Mongoose module used to create the model.
 * @param {Object} TvShowSchema - The Mongoose schema used to create the model.
 * @param {Function} model - The Mongoose model used to create the model.
 *
 *
 */

const mongoose = require("mongoose");
const TvShowSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    language: [{ type: String }],
    avgRuntime: { type: String },
    ReleaseYear: { type: String },
    rating: { type: Number },
    genre: [{ type: String }],
    Seasons: [{ type: Number }],
    Episodes: { type: Number },
    Createdby: { type: Number },
    Updatedby: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TvShow", TvShowSchema);