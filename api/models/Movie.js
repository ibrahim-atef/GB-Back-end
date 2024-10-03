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
    title: { type: String, required: true, unique: true }, // Movie title
    desc: { type: String }, // Movie description
    img: { type: String }, // Main poster image URL
    imgTitle: { type: String }, // Title image URL
    imgSm: { type: String }, // Small image URL
    trailer: { type: String }, // Trailer URL
    language: [{ type: String }], // Array for multiple languages
    releaseYear: { type: String }, // Release year of the movie or part
    rating: { type: Number }, // Average rating
    genre: [{ type: String }], // Array of genres

    parts: [
      {
        id: { type: Number, required: true }, // Part ID
        releaseYear: { type: String }, // Release year of the part
        movieTitle: { type: String, required: true }, // Title of the part
        movieDesc: { type: String, required: true }, // Description of the part
        moviePoster: { type: String, required: true }, // Poster image URL
        videoUrl: { type: String, required: true }, // Video URL for streaming
      },
    ],

    createdBy: { type: Number, required: true }, // User ID of the creator
    updatedBy: { type: Number, required: true }, // User ID of the last updater
  },

  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
