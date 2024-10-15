/**
 * @author : Shehab Gamal
 * @description : This file contains the TvShow controller functions.
 * @date : 03/09/2024
 */

const TvShow = require("../models/TvShow");
const Season = require("../models/Season");
const Episode = require("../models/Episode");

/*** Create TvShow ***/
const createTvShow = async (req, res) => {
  try {
    const tvShowData = {
      ...req.body,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    };

    const newTvShow = new TvShow(tvShowData);
    const savedTvShow = await newTvShow.save();
    res.status(201).json(savedTvShow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get all TvShows (with pagination) ***/
const getAllTvShowsWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
    const skip = (page - 1) * limit;

    const tvShows = await TvShow.find()
      .skip(skip)
      .limit(limit);
    const totalTvShows = await TvShow.countDocuments();

    res.status(200).json({
      totalTvShows,
      currentPage: page,
      totalPages: Math.ceil(totalTvShows / limit),
      tvShows,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get TvShow by ID ***/
const getTvShowById = async (req, res) => {
  try {
    const tvShow = await TvShow.findById(req.params.id);
    if (!tvShow) {
      return res.status(404).json({ message: "TV Show not found!" });
    }
    res.status(200).json(tvShow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get upcoming TvShows ***/
const getUpcomingTvShows = async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingTvShows = await TvShow.find({
      release_date: { $gt: currentDate },
    });

    res.status(200).json(upcomingTvShows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Search TvShows by name ***/
// const searchTvShows = async (req, res) => {
//   try {
//     const searchTerm = req.query.q;
//     const tvShows = await TvShow.find({
//       title: { $regex: searchTerm, $options: "i" },
//     });

//     res.status(200).json(tvShows);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

/*** Update TvShow by ID ***/
const updateTvShowById = async (req, res) => {
  try {
    const updatedTvShow = await TvShow.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.id,
      },
      { new: true, runValidators: true }
    );
    if (!updatedTvShow) {
      return res.status(404).json({ message: "TV Show not found!" });
    }
    res.status(200).json(updatedTvShow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Delete TvShow by ID ***/
const deleteTvShowById = async (req, res) => {
  try {
    const deletedTvShow = await TvShow.findByIdAndDelete(req.params.id);
    if (!deletedTvShow) {
      return res.status(404).json({ message: "TV Show not found!" });
    }
    res.status(200).json({ message: "TV Show deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get TvShow Part by ID ***/
const getTvShowPartById = async (req, res) => {
  try {
    const tvShow = await TvShow.findById(req.params.id);
    if (!tvShow || !tvShow.parts) {
      return res.status(404).json({ message: "TV Show or part not found!" });
    }

    const part = tvShow.parts.find((part) => part.id === parseInt(req.params.partId));
    if (!part) {
      return res.status(404).json({ message: "Part not found!" });
    }

    res.status(200).json(part);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Add TvShow Part ***/
const addTvShowPart = async (req, res) => {
  try {
    const tvShow = await TvShow.findById(req.params.id);
    if (!tvShow) {
      return res.status(404).json({ message: "TV Show not found!" });
    }

    const newPart = { ...req.body, id: tvShow.parts.length + 1 };
    tvShow.parts.push(newPart);
    await tvShow.save();

    res.status(201).json(newPart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Update TvShow Part by ID ***/
const updateTvShowPartById = async (req, res) => {
  try {
    const tvShow = await TvShow.findById(req.params.id);
    if (!tvShow || !tvShow.parts) {
      return res.status(404).json({ message: "TV Show or part not found!" });
    }

    const partIndex = tvShow.parts.findIndex((part) => part.id === parseInt(req.params.partId));
    if (partIndex === -1) {
      return res.status(404).json({ message: "Part not found!" });
    }

    tvShow.parts[partIndex] = { ...tvShow.parts[partIndex], ...req.body };
    await tvShow.save();

    res.status(200).json(tvShow.parts[partIndex]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Delete TvShow Part by ID ***/
const deleteTvShowPartById = async (req, res) => {
  try {
    const tvShow = await TvShow.findById(req.params.id);
    if (!tvShow || !tvShow.parts) {
      return res.status(404).json({ message: "TV Show or part not found!" });
    }

    tvShow.parts = tvShow.parts.filter((part) => part.id !== parseInt(req.params.partId));
    await tvShow.save();

    res.status(200).json({ message: "Part deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get TvShow Episode by ID
const getTvShowEpisodeById = async (req, res) => {
  try {
    const tvShow = await TvShow.findById(req.params.tvShowId);
    if (!tvShow) {
      return res.status(404).json({ message: "TvShow not found!" });
    }

    const season = tvShow.seasons.id(req.params.seasonId);
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

// Add TvShow Episode
const addTvShowEpisode = async (req, res) => {
  try {
    const tvShow = await TvShow.findById(req.params.tvShowId);
    if (!tvShow) {
      return res.status(404).json({ message: "TvShow not found!" });
    }

    const season = tvShow.seasons.id(req.params.seasonId);
    if (!season) {
      return res.status(404).json({ message: "Season not found!" });
    }

    const newEpisode = { ...req.body, id: season.episodes.length + 1 };
    season.episodes.push(newEpisode);

    await tvShow.save();
    res.status(201).json(newEpisode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTvShowEpisodeById = async (req, res) => {
  try {
    const tvShow = await TvShow.findById(req.params.tvShowId);
    if (!tvShow || !tvShow.seasons) {
      return res.status(404).json({ message: "TvShow or seasons not found!" });
    }

    const season = tvShow.seasons.id(req.params.seasonId);
    if (!season) {
      return res.status(404).json({ message: "Season not found!" });
    }

    const episode = season.episodes.id(req.params.episodeId);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found!" });
    }

    Object.assign(episode, req.body);

    await tvShow.save();
    res.status(200).json(episode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete TvShow Episodeconst deleteTvShowEpisodeById = async (req, res) => {
const deleteTvShowEpisodeById = async (req, res) => {
  try {
    const tvShow = await TvShow.findById(req.params.tvShowId);
    if (!tvShow || !tvShow.seasons) {
      return res.status(404).json({ message: "TvShow or seasons not found!" });
    }

    const season = tvShow.seasons.id(req.params.seasonId);
    if (!season) {
      return res.status(404).json({ message: "Season not found!" });
    }

    const episode = season.episodes.id(req.params.episodeId);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found!" });
    }

    episode.remove();
    await tvShow.save();

    res.status(200).json({ message: "Episode deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all seasons for a given TvShow
const getSeasonsByTvShowId = async (req, res) => {
  try {
      const { TvShowId } = req.params;
      const seasons = await Season.findAll({ where: { TvShowId } });

      if (!seasons.length) {
          return res.status(404).json({ message: "No seasons found for this series" });
      }

      res.status(200).json({ seasons });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Get all episodes for a given season
const getEpisodesBySeasonId = async (req, res) => {
  try {
      const { TvShowId } = req.params;
      const episodes = await Episode.findAll({ where: { TvShowId } });

      if (!episodes.length) {
          return res.status(404).json({ message: "No episodes found for this season" });
      }

      res.status(200).json({ episodes });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createTvShow,
  getAllTvShowsWithPagination,
  getTvShowById,
  getUpcomingTvShows,
  // searchTvShows,
  updateTvShowById,
  deleteTvShowById,
  getTvShowPartById,
  addTvShowPart,
  updateTvShowPartById,
  deleteTvShowPartById,
  getTvShowEpisodeById,
  addTvShowEpisode,
  updateTvShowEpisodeById,
  deleteTvShowEpisodeById,
  getSeasonsByTvShowId,
  getEpisodesBySeasonId,
};
