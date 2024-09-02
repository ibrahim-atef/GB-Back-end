/**
 * @author : Ahmed Elfeky
 * @description : This file contains the Movie model
 * @date : 28/08/2024
 *
 * @param {Object} mongoose - The Mongoose module used to create the model.
 * @param {Object} MovieSchema - The Mongoose schema used to create the model.
 * @param {Function} model - The Mongoose model used to create the model.
 *
 */

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    duration: { type: String },
    releaseDate: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    rating: { type: Number },
    genre: { type: String, multi: true },
    cast: { type: String, multi: true },
    director: { type: String },
    writer: { type: String },
    actors: { type: String, multi: true },
    url: { type: String },
    createdBy: { type: Number, required: true },
    updatedBy: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
