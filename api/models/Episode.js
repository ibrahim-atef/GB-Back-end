// models/Episode.js

const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema(
  {
    seasonId: { type: mongoose.Schema.Types.ObjectId, ref: "Season", required: true }, // Reference to Season
    episodeNumber: { type: Number, required: true }, // Episode number
    rating: { type: Number }, // Average rating for the episode
    votes: {
      type: [Number],
      default: [0, 0, 0, 0, 0], // [1 star votes, 2 star votes, etc.]
    },
    episodeTitle: { type: String, required: true }, // Title of the episode
    episodeDesc: { type: String }, // Description of the episode
    time: { type: String }, // Episode runtime
    episodeImage: { type: String }, // Image URL for the episode
    videoUrl: { type: String, required: true }, // Video URL for streaming
  },
  { timestamps: true }
);

module.exports = mongoose.model("Episode", EpisodeSchema);
