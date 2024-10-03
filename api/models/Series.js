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
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String }, 
    img: { type: String }, // For series poster or image
    imgTitle: { type: String }, // Title image URL
    imgSm: { type: String }, // Smaller image for thumbnail
    trailer: { type: String }, // Trailer URL
    language: [{ type: String }], // Array of languages
    avgRuntime: { type: String }, // Average runtime of episodes
    releaseYear: { type: String }, // Year of release
    rating: { type: Number }, // Average rating
    genre: [{ type: String }], // Array of genres

    seasons: [
      {
        id: { type: Number, required: true },
        seasonTitle: { type: String }, // Title of the season
        seasonDesc: { type: String }, // Description of the season
        seasonPoster: { type: String }, // Poster image for the season
        episodes: [
          {
            id: { type: Number, required: true },
            episodeNumber: { type: Number }, // Episode number
            episodeTitle: { type: String }, // Title of the episode
            episodeDescription: { type: String }, // Description of the episode
            time: { type: String }, // Episode runtime
            episodeImage: { type: String }, // Image URL for the episode
            videoUrl: { type: String, required: true }, // Video URL for streaming
          },
        ],
      },
    ],

    createdBy: { type: Number, required: true }, // User ID of creator
    updatedBy: { type: Number, required: true }, // User ID of last updater
  },

  { timestamps: true }
);

module.exports = mongoose.model("Series", SeriesSchema);
