// models/MoviePart.js

const mongoose = require("mongoose");

const MoviePartSchema = new mongoose.Schema(
  {
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true }, // Reference to Movie
    releaseYear: { type: String }, // Release year of the part
    movieTitle: { type: String, required: true }, // Title of the part
    movieDesc: { type: String, required: true }, // Description of the part
    moviePoster: { type: String, required: true }, // Poster image URL
    videoUrl: { type: String, required: true }, // Video URL for streaming
  },
  { timestamps: true }
);

module.exports = mongoose.model("MoviePart", MoviePartSchema);
