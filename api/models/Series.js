// models/Series.js

const mongoose = require("mongoose");

const SeriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }, // Series title
    desc: { type: String }, // Series description
    img: { type: String }, // Series poster image URL
    imgTitle: { type: String }, // Title image URL
    imgSm: { type: String }, // Small image URL
    trailer: { type: String }, // Trailer URL
    language: [{ type: String }], // Array of languages
    avgRuntime: { type: String }, // Average runtime of episodes
    releaseYear: { type: String }, // Year of release
    rating: { type: Number }, // Average rating
    votes: {
      type: [Number],
      default: [0, 0, 0, 0, 0], // [1 star votes, etc.]
    },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Reference to categories
    seasons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Season" }], // Reference to seasons
    createdBy: { type: Number, required: true }, // User ID of creator
    updatedBy: { type: Number, required: true }, // User ID of last updater
  },
  { timestamps: true }
);

module.exports = mongoose.model("Series", SeriesSchema);
