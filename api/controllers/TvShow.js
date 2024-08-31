/**
 * @author : Shehab gamal
 * @description : This file contains the TvShow Mongo Model
 * @date : 27/09/2022
 *
 * @param {Object} mongoose - The Mongoose module used to create the model.
 * @param {Object} TvShowControllers - The Mongoose schema used to create the model.
 * @param {Function} controllers - The Mongoose Controller used to create the model.
 *
 *
 */

const TvShow = require("../models/TvShow");

const CreateTvShow = async (req, res) => {
  const {
    title,
    desc,
    img,
    imgTitle,
    imgSm,
    trailer,
    video,
    language,
    avgRuntime,
    ReleaseYear,
    rating,
    genre,
    Seasons,
    Episodes,
  } = req.body;
  try {
    const tvShow = new TvShow({
      title,
      desc,
      img,
      imgTitle,
      imgSm,
      trailer,
      video,
      language,
      avgRuntime,
      ReleaseYear,
      rating,
      genre,
      Seasons,
      Episodes,
      Createdby: req.user.id,
      Updatedby: req.user.id,
    });
    const savedTvShow = await tvShow.save();
    res.status(200).json(savedTvShow);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};
const getTvShowById = async (req, res) => {
  const { id } = req.params;
  try {
    const tvShow = await TvShow.findById(id);
    res.status(200).json(tvShow);
  } catch (err) {
    res.status(500).json({ Error: err.message });
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
  const {
    title,
    desc,
    img,
    imgTitle,
    imgSm,
    trailer,
    video,
    language,
    avgRuntime,
    ReleaseYear,
    rating,
    genre,
    Seasons,
    Episodes,
  } = req.body;
  try {
    const tvShow = await TvShow.findById(id);
    tvShow.title = title;
    tvShow.desc = desc;
    tvShow.img = img;
    tvShow.imgTitle = imgTitle;
    tvShow.imgSm = imgSm;
    tvShow.trailer = trailer;
    tvShow.video = video;
    tvShow.schedule = schedule;
    tvShow.language = language;
    tvShow.avgRuntime = avgRuntime;
    tvShow.ReleaseYear = ReleaseYear;
    tvShow.rating = rating;
    tvShow.genre = genre;
    tvShow.Seasons = Seasons;
    tvShow.Episodes = Episodes;
    tvShow.Updatedby = req.user.id;
    const updatedTvShow = await tvShow.save();
    res.status(200).json(updatedTvShow);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};
const deleteTvShow = async (req, res) => {
  const { id } = req.params;
  try {
    const tvShow = await TvShow.findById(id);
    await tvShow.remove();
    res.status(200).json("TvShow has been deleted...");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = { getAllTvShows, CreateTvShow, getTvShowById, updateTvShow, deleteTvShow };
