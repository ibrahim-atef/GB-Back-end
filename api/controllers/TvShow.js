/**
 * @author : Shehab gamal
 * @description : This file contains the TvShow Mongo Model
 * @date : 03/09/2024
 *
 *
 * @param {Object} TvShowControllers - The Mongoose schema used to create the model.
 * @param {Function} controllers - The Mongoose Controller used to create the model.
 *
 *
 *
 */
const fs = require("fs");
const path = require("path");
const TvShow = require("../models/TvShow");

const CreateTvShow = async (req, res) => {
  try {
    const tvShow = new TvShow({
      ...req.body, // Spread the properties from req.body
      Createdby: req.user.id, // Add the created by user
      Updatedby: req.user.id, // Add the updated by user
    });

    const savedTvShow = await tvShow.save();
    res.status(200).json(savedTvShow);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};
// const getTvShowById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const tvShow = await TvShow.findById(id);
//     res.status(200).json(tvShow);
//   } catch (err) {
//     res.status(500).json({ Error: err.message });
//   }
// };
const getTvShowById = async (req, res) => {
  const { tvshowId, seasonId, episodeId } = req.params;
  //find tvshow by id
  const tvShow = await TvShow.findById(tvshowId);
  if (!tvShow) {
    return res.status(404).json({ message: "TV Show not found" });
  }
  //find season by id
  const season = tvShow.seasons.id(seasonId);
  if (!season) {
    return res.status(404).json({ message: "Season not found" });
  }
  //find episode by id
  const episode = season.episodes.id(episodeId);
  if (!episode) {
    return res.status(404).json({ message: "Episode not found" });
  }
  const videopath = path.join(__dirname, "video", episode.videoUrl);
  const videostats = fs.statSync(videopath);
  const videoSize = videostats.size;
  const range = req.headers.range;
  // if range exists
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
    const chunksize = end - start + 1;
    if (start >= videoSize || end >= videoSize || start > end) {
      res.status(416).send("Range Not Satisfiable");
      return;
    }
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });
    const videoStream = fs.createReadStream(videopath, { start, end });
    videoStream.pipe(res);
    videoStream.on("error", (err) => {
      res.status(500).send({ Error: err.message });
    });
  } else {
    //if range not exists
    res.writeHead(200, {
      "Content-Length": videoSize,
      "Content-Type": "video/mp4",
    });
    const videoStream = fs.createReadStream(videopath);
    videoStream.pipe(res);
    videoStream.on("error", (err) => {
      res.status(500).send({ Error: err.message });
    });
  }
};
const getAllTvShows = async (req, res) => {
  try {
    const tvShows = await TvShow.findAll({});
    res.status(200).json(tvShows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const updateTvShow = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Using the `new: true` option to return the updated document
    const updatedTvShow = await TvShow.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true, // Ensures the update is validated against the schema
    });

    if (!updatedTvShow) {
      return res.status(404).json({ message: "TV Show not found" });
    }

    res.status(200).json(updatedTvShow);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const deleteTvShow = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTvShow = await TvShow.findByIdAndDelete(id);

    if (!deletedTvShow) {
      return res.status(404).json({ message: "TV Show not found" });
    }

    res.status(200).json("TvShow has been deleted...");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = { getAllTvShows, CreateTvShow, getTvShowById, updateTvShow, deleteTvShow };
