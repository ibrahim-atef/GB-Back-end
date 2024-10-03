/**
 * @author : Shehab Gamal
 * @description : This file contains the TvShow controller functions.
 * @date : 03/09/2024
 */

const TvShow = require("../models/TvShow");

/*** Create TvShow ***/
const CreateTvShow = async (req, res) => {
  try {
    const tvShowData = {
      ...req.body,
      Createdby: req.user.id,
      Updatedby: req.user.id,
    };

    const tvShow = new TvShow(tvShowData);
    const savedTvShow = await tvShow.save();
    res.status(201).json(savedTvShow);
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

/*** Get All TvShows ***/
const getAllTvShows = async (req, res) => {
  try {
    const tvShows = await TvShow.find();
    res.status(200).json(tvShows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Update TvShow by ID ***/
const updateTvShow = async (req, res) => {
  try {
    const updatedTvShow = await TvShow.findByIdAndUpdate(
      req.params.id,
      { ...req.body, Updatedby: req.user.id },
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
const deleteTvShow = async (req, res) => {
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

module.exports = {
  getAllTvShows,
  CreateTvShow,
  getTvShowById,
  updateTvShow,
  deleteTvShow,
};
