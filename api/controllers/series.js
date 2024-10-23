/**
 * @author : Alaa Ayaad
 * @date : 28/09/2024
 *
 * @description : Controller functions to handle series CRUD operations.
 */

const Series = require("../models/Series");
const Season = require("../models/Season");
const Episode = require("../models/Episode");

/*** Create Series ***/
const createSeries = async (req, res) => {
  try {
    const seriesData = {
      ...req.body,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    };

    const newSeries = new Series(seriesData);
    const savedSeries = await newSeries.save();
    res.status(201).json(savedSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get all series (with pagination) ***/
const getAllSeriesWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
    const skip = (page - 1) * limit;

    const series = await Series.find().skip(skip).limit(limit);
    const totalSeries = await Series.countDocuments();

    res.status(200).json({
      totalSeries,
      currentPage: page,
      totalPages: Math.ceil(totalSeries / limit),
      series,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get series by ID ***/
const getSeriesById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) {
      return res.status(404).json({ message: "Series not found!" });
    }
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get upcoming series ***/
const getUpcomingSeries = async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingSeries = await Series.find({
      release_date: { $gt: currentDate },
    });

    res.status(200).json(upcomingSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Search series by name ***/
// const searchSeries = async (req, res) => {
//   try {
//     const searchTerm = req.query.q;
//     const series = await Series.find({
//       title: { $regex: searchTerm, $options: "i" },
//     });

//     res.status(200).json(series);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

/*** Update series ***/
const updateSeries = async (req, res) => {
  try {
    const updatedSeries = await Series.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.id,
      },
      { new: true, runValidators: true }
    );
    if (!updatedSeries) {
      return res.status(404).json({ message: "Series not found!" });
    }
    res.status(200).json(updatedSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Delete series ***/
const deleteSeries = async (req, res) => {
  try {
    const deletedSeries = await Series.findByIdAndDelete(req.params.id);
    if (!deletedSeries) {
      return res.status(404).json({ message: "Series not found!" });
    }
    res.status(200).json({ message: "Series deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get Series Part by ID ***/
const getSeriesPartById = async (req, res) => {
  try {
    // Find the series by the series ID
    const series = await Series.findById(req.params.id).populate('seasons'); // Populate the seasons field with actual Season documents

    if (!series || !series.seasons) {
      return res.status(404).json({ message: "Series or part not found!" });
    }

    // Get the partId from req.query (since you're passing it as a query param in the URL)
    const partId = req.query.partId;

    // Find the season by ObjectId from the populated seasons array
    const part = series.seasons.find(season => season._id.toString() === partId);

    if (!part) {
      return res.status(404).json({ message: "Part not found!" });
    }

    res.status(200).json(part); // Return the found season
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/*** Add Series Part ***/
const addSeriesPart = async (req, res) => {
  try {
    const series = await Series.findById(req.body.seriesId);

    console.log("Series found:", series);
    if (!series) {
      return res.status(404).json({ message: "Series not found!" });
    }

    // Create a new season document from the request body
    const newSeason = new Season({
      seriesId: req.body.seriesId, // Include seriesId in the new Season
      seasonTitle: req.body.seasonTitle,
      seasonDesc: req.body.seasonDesc,
      seasonPoster: req.body.seasonPoster,
      releaseYear: req.body.releaseYear,
      episodes: req.body.episodes,
    });

    // Save the new season to the database
    const savedSeason = await newSeason.save();

    // Push the saved season's ObjectId to the series' seasons array
    series.seasons.push(savedSeason._id);
    await series.save();

    res.status(201).json(savedSeason); // Return the saved season
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Update Series Part by ID ***/
const updateSeriesPartById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series || !series.parts) {
      return res.status(404).json({ message: "Series or part not found!" });
    }

    const partIndex = series.parts.findIndex(
      (part) => part.id === parseInt(req.params.partId)
    );
    if (partIndex === -1) {
      return res.status(404).json({ message: "Part not found!" });
    }

    series.parts[partIndex] = { ...series.parts[partIndex], ...req.body };
    await series.save();

    res.status(200).json(series.parts[partIndex]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Delete Series Part by ID ***/
const deleteSeriesPartById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series || !series.parts) {
      return res.status(404).json({ message: "Series or part not found!" });
    }

    series.parts = series.parts.filter(
      (part) => part.id !== parseInt(req.params.partId)
    );
    await series.save();

    res.status(200).json({ message: "Part deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Series Episode by ID
const getSeriesEpisodeById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.seriesId);
    if (!series) {
      return res.status(404).json({ message: "Series not found!" });
    }

    const season = series.seasons.id(req.params.seasonId);
    if (!season) {
      return res.status(404).json({ message: "Season not found!" });
    }

    const episode = season.episodes.id(req.params.episodeId);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found!" });
    }

    res.status(200).json(episode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const mongoose = require("mongoose");

const addSeriesEpisode = async (req, res) => {
  try {
    // Validate ObjectId formats
    const { seriesId, seasonId } = req.body;
    if (!mongoose.isValidObjectId(seriesId) || !mongoose.isValidObjectId(seasonId)) {
      return res.status(400).json({ message: "Invalid seriesId or seasonId format." });
    }

    // Find the series by seriesId from the request body
    const series = await Series.findById(seriesId);
    if (!series) {
      return res.status(404).json({ message: "Series not found!" });
    }
    console.log("series", series);

    // Find the season by seasonId from the series' seasons array
    const season = series.seasons.find(season => season.toString() === seasonId);
    if (!season) {
      return res.status(404).json({ message: "Season not found!" });
    }

    // Create a new episode object
    const newEpisode = new Episode({
      seasonId: season, // Reference to the season
      episodeNumber: req.body.episodeNumber, // From request body
      episodeTitle: req.body.episodeTitle, // From request body
      episodeDesc: req.body.episodeDesc, // From request body
      time: req.body.time, // From request body
      episodeImage: req.body.episodeImage, // From request body
      videoUrl: req.body.videoUrl // From request body
    });

    // Save the new episode to the database
    await newEpisode.save();
    
    // Ensure that the 'episodes' array is defined before pushing to it
    if (!season.episodes) {
      season.episodes = []; // Initialize if not already an array
    }

    // Push the new episode's ID to the season's episodes array
    season.episodes.push(newEpisode._id);
    await series.save();

    res.status(201).json(newEpisode); // Return the saved episode
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSeriesEpisodeById = async (req, res) => {
  try {
    const { seriesId, seasonId, episodeId } = req.body;

    // Find the series by seriesId and populate the seasons with their full documents
    const series = await Series.findById(seriesId).populate({
      path: 'seasons',
      populate: { path: 'episodes' } // Populate episodes inside each season
    });

    if (!series || !series.seasons) {
      return res.status(404).json({ message: "Series or seasons not found!" });
    }

    // Find the season within the populated seasons array
    const season = series.seasons.find(season => season._id.toString() === seasonId);
    if (!season) {
      return res.status(404).json({ message: "Season not found!" });
    }

    // Find the episode within the populated season
    const episode = season.episodes.find(episode => episode._id.toString() === episodeId);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found!" });
    }

    // Update the episode with new data from the request body
    Object.assign(episode, req.body);

    // Save the series document since changes were made to an embedded document
    await series.save();

    // Send the updated episode as a response
    res.status(200).json(episode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete Series Episodeconst deleteSeriesEpisodeById = async (req, res) => {
const deleteSeriesEpisodeById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.seriesId);
    if (!series || !series.seasons) {
      return res.status(404).json({ message: "Series or seasons not found!" });
    }

    const season = series.seasons.id(req.params.seasonId);
    if (!season) {
      return res.status(404).json({ message: "Season not found!" });
    }

    const episode = season.episodes.id(req.params.episodeId);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found!" });
    }

    episode.remove();
    await series.save();

    res.status(200).json({ message: "Episode deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all seasons for a given series
const getSeasonsBySeriesId = async (req, res) => {
  try {
    const { seriesId } = req.params;
    const seasons = await Season.findAll({ where: { seriesId } });

    if (!seasons.length) {
      return res
        .status(404)
        .json({ message: "No seasons found for this series" });
    }

    res.status(200).json({ seasons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all episodes for a given season
const getEpisodesBySeasonId = async (req, res) => {
  try {
    const { seasonId } = req.params;
    const episodes = await Episode.findAll({ where: { seasonId } });

    if (!episodes.length) {
      return res
        .status(404)
        .json({ message: "No episodes found for this season" });
    }

    res.status(200).json({ episodes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSeries,
  getAllSeriesWithPagination,
  getSeriesById,
  getUpcomingSeries,
  // searchSeries,
  updateSeries,
  deleteSeries,
  getSeriesPartById,
  addSeriesPart,
  updateSeriesPartById,
  deleteSeriesPartById,
  getSeriesEpisodeById,
  addSeriesEpisode,
  updateSeriesEpisodeById,
  deleteSeriesEpisodeById,
  getSeasonsBySeriesId,
  getEpisodesBySeasonId,
};
