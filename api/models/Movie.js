// models/Movie.js

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Movie title
    overview: { type: String }, // Movie description
    poster_path: { type: String }, // Main poster image URL
    poster_Title: { type: String }, // Title image URL
    imgSm: { type: String }, // Small image URL
    backdrop_path: { type: String }, // Backdrop image URL
    first_air_date: { type: Date }, // Release date
    trailer: { type: String }, // Trailer URL
    language: [{ type: String }], // Array for multiple languages
    releaseYear: { type: String }, // Release year of the movie or part
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Reference to categories
    parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "MoviePart" }], // Reference to movie parts
    createdBy: { type: Number, required: true }, // User ID of the creator
    updatedBy: { type: Number, required: true }, // User ID of the last updater
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
