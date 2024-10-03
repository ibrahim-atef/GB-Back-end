/**
 * @author : Shehab Gamal
 * @description : This file contains the TvShow Mongo Model
 * @date : 27/09/2022
 *
 * @param {Object} mongoose - The Mongoose module used to create the model.
 * @param {Object} TvShowSchema - The Mongoose schema used to create the model.
 * @param {Function} model - The Mongoose model used to create the model.
 *
 */

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
      default: [0, 0, 0, 0, 0], // [1 star votes, 2 star votes, 3 star votes, 4 star votes, 5 star votes]
    },
    genre: [{ type: String }], // Array of genres
    avgRuntime: { type: String }, // Average runtime of episodes

    seasons: [
      {
        id: { type: Number, required: true }, // Season ID
        rating: { type: Number },  // Average rating for the season
        votes: {
          type: [Number],
          default: [0, 0, 0, 0, 0],  // Votes for the season
        },
        releaseYear: { type: String }, // Release year of the season
        seasonTitle: { type: String }, // Season title
        seasonDesc: { type: String }, // Season description
        seasonPoster: { type: String }, // Season poster image URL

        episodes: [
          {
            id: { type: Number, required: true }, // Episode ID
            rating: { type: Number },  // Average rating for the episode
            votes: {
              type: [Number],
              default: [0, 0, 0, 0, 0],  // Votes for the episode
            },
            episodeTitle: { type: String }, // Episode title
            episodeDesc: { type: String }, // Episode description
            episodePoster: { type: String }, // Episode poster image URL
            videoUrl: { type: String, required: true }, // Video URL for the episode
          },
        ],
      },
    ],

    createdBy: { type: Number, required: true }, // User ID of the creator
    updatedBy: { type: Number, required: true }, // User ID of the last updater
  },

  { timestamps: true }
);

module.exports = mongoose.model("TvShow", TvShowSchema);
