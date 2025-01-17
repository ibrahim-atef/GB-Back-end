// models/Season.js

const mongoose = require("mongoose");

const SeasonSchema = new mongoose.Schema(
  {
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: "Series" }, // For Series
    tvShowId: { type: mongoose.Schema.Types.ObjectId, ref: "TvShow" }, // For TV Show
    seasonTitle: { type: String, required: true }, // Title of the season
    seasonDesc: { type: String }, // Description of the season
    seasonPoster: { type: String }, // Poster image URL
    releaseYear: { type: String }, // Release year of the season
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }], // References to episodes
  },
  { timestamps: true }
);

module.exports = mongoose.model("Season", SeasonSchema);
