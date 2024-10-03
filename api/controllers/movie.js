/**
 * @author : Ahmed Elfeky
 * @description : This file contains the Movie controller functions.
 * @date : 28/08/2024
 */

const Movie = require("../models/Movie");

/*** Create Movie ***/
const createMovie = async (req, res) => {
  try {
    const movieData = {
      ...req.body,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    };

    const newMovie = new Movie(movieData);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get Movie by ID ***/
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found!" });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get All Movies ***/
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Update Movie by ID ***/
const updateMovieById = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.id,
      },
      { new: true, runValidators: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found!" });
    }
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Delete Movie by ID ***/
const deleteMovieById = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found!" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createMovie,
  getMovieById,
  getAllMovies,
  updateMovieById,
  deleteMovieById,
};
