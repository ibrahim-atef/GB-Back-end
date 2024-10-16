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
    const series = await Series.findById(req.params.id);
    if (!series || !series.parts) {
      return res.status(404).json({ message: "Series or part not found!" });
    }

    const part = series.parts.find(
      (part) => part.id === parseInt(req.params.partId)
    );
    if (!part) {
      return res.status(404).json({ message: "Part not found!" });
    }

    res.status(200).json(part);
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

// Add Series Episode
const addSeriesEpisode = async (req, res) => {
  try {
    const series = await Series.findById(req.body.seriesId);
    if (!series) {
      return res.status(404).json({ message: "Series not found!" });
    }
    console.log("series", series);
    const season = series.seasons.findById(req.body.seasonId);
    if (!season) {
      return res.status(404).json({ message: "Season not found!" });
    }

    // Create a new episode object
    const newEpisode = new Episode({
      seasonId: season._id, // Reference to the season
      episodeNumber: req.body.episodeNumber, // From request body
      episodeTitle: req.body.episodeTitle, // From request body
      episodeDesc: req.body.episodeDesc, // From request body
      time: req.body.time, // From request body
      episodeImage: req.body.episodeImage, // From request body
      videoUrl: req.body.videoUrl, // From request body
    });

    // Save the new episode to the database
    await newEpisode.save();

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

    Object.assign(episode, req.body);

    await series.save();
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
