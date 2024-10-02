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
    // {
    //   name: { type: String, required: true },
    //   seasons: { type: Array, required: true },
    //   episodes: { type: Array, required: true },
    //   coverPic: { type: String, default: "" },
    //   yearOfPublish: { type: Number, required: true },
    //   trailer: { type: String, required: true },
    //   video: { type: String, required: true },
    //   rating: { type: Number },
    //   createdBy: { type: Number, required: true },
    //   updatedBy: { type: Number, required: true },
    // },
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    language: [{ type: String }],
    avgRuntime: { type: String },
    ReleaseYear: { type: String },
    rating: { type: Number },
    genre: [{ type: String }],
    seasons: [
      {
        id: { type: Number, required: true },
        episodes: [
          {
            id: { type: Number, required: true },
            videoUrl: { type: String, required: true },
          },
        ],
      },
    ],
    Createdby: { type: Number },
    Updatedby: { type: Number },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Series", SeriesSchema);
