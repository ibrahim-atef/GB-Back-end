// models/TvShow.js

const mongoose = require("mongoose");

const TvShowSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }, // TV Show title
    desc: { type: String }, // TV Show description
    img: { type: String }, // Main poster image URL
    imgTitle: { type: String }, // Title image URL
    imgSm: { type: String }, // Small image URL
    trailer: { type: String }, // Trailer URL
    language: [{ type: String }], // Array for multiple languages
    releaseYear: { type: String }, // Release year of the show
    rating: { type: Number }, // Average rating
    votes: {
      type: [Number],
      default: [0, 0, 0, 0, 0], // [1 star votes, etc.]
    },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Reference to categories
    seasons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Season" }], // Reference to seasons
    createdBy: { type: Number, required: true }, // User ID of the creator
    updatedBy: { type: Number, required: true }, // User ID of the last updater
  },
  { timestamps: true }
);

module.exports = mongoose.model("TvShow", TvShowSchema);
