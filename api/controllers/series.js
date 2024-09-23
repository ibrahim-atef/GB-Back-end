/**
 * @author : Alaa Ayaad
 * @description : This file contains the routes for authentication
 * @date : 28/09/2024
 *
 * @param {Object} router - The Express router to define the routes.
 * @param {Function} createSeries - Controller function to handle add series  Operation.
 * @param {Function} getAllseries - Controller function to handle get request of series.
 * @param {Function} getSeriesById - Controller function to handle get request of special series.
 
 * @param {Function} updateSeries  - Controller function to handle put request of series.
 * @param {Function} deleteSeries - Controller function to handle delete request of series.
 */
const fs = require("fs");
const path = require("path");
const Series = require("../models/Sereis");
/***create Series***/
const createSeries = async (req, res) => {
  try {
    const newSeries = new Series(req.body);
    const savedSeries = await newSeries.save();
    res.status(201).json(savedSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**Get all series**/
const getAllSeries = async (req, res) => {
  try {
    const series = await Series.find();
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** get series by id ***/
const getSeriesById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) return res.status(400).json({ message: "This series not found!" });
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/*** stream series */
const streamSeries = async (req, res) => {
  const { seriesId, seasonId, episodeId } = req.params;
  //find series by id
  const series = await Series.findById(seriesId);
  if (!series) {
    return res.status(404).json({ message: "series not found" });
  }
  //find season by id
  const season = series.seasons.id(seasonId);
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

/*** update Series ***/
const updateSeries = async (req, res) => {
  try {
    const updatedSeries = await Series.findByIdAndUpdate(
      req.params.id,
      req.body
      // { new: true, runValidators: true }
    );
    if (!updatedSeries) return res.status(404).json({ message: "Series not found" });
    res.status(200).json(updatedSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** delete Series ***/
const deleteSeries = async (req, res) => {
  try {
    const deletedSeries = await Series.findByIdAndDelete(req.params.id);
    if (!deletedSeries) return res.status(404).json({ message: "Series not found" });
    res.status(200).json({ message: "Series deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createSeries,
  getAllSeries,
  getSeriesById,
  updateSeries,
  deleteSeries,
};
