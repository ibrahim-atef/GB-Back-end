/**
 * @author : Ahmed Elfeky
 * @description : This file contains the Movie model
 * @date : 28/08/2024
 *
 * @param {Object} mongoose - The Mongoose module used to create the model.
 * @param {Object} MovieSchema - The Mongoose schema used to create the model.
 * @param {Function} model - The Mongoose model used to create the model.
 *
 */

const Movie = require("../models/Movie");

const createMovie = async (req, res) => {
  const {
    title,
    desc,
    duration,
    releaseDate,
    img,
    imgTitle,
    imgSm,
    trailer,
    video,
    year,
    rating,
    genre,
    cast,
    director,
    writer,
    actors,
    url,
  } = req.body;
  try {
    const movie = new Movie({
      title,
      desc,
      duration,
      releaseDate,
      img,
      imgTitle,
      imgSm,
      trailer,
      video,
      year,
      rating,
      genre,
      cast,
      director,
      writer,
      actors,
      url,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });
    const newMovie = await movie.save();
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};
const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};
const getAllMovies = async (req, res) => {
  try {
    const movie = await Movie.find({});
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};
const updateMovieById = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    desc,
    duration,
    releaseDate,
    img,
    imgTitle,
    imgSm,
    trailer,
    video,
    year,
    rating,
    genre,
    cast,
    director,
    writer,
    actors,
    url,
    
  } = req.body;
  try { // Try to find better way to update only given new data
    const movie = await Movie.findById(id);
    movie.title = title;
    movie.desc = desc;
    movie.duration = duration;
    movie.releaseDate = releaseDate;
    movie.img = img;
    movie.imgTitle = imgTitle;
    movie.imgSm = imgSm;
    movie.trailer = trailer;
    movie.video = video;
    movie.year = year;
    movie.rating = rating;
    movie.genre = genre;
    movie.cast = cast;
    movie.director = director;
    movie.writer = writer;
    movie.actors = actors;
    movie.url = url;
    updatedBy = req.user.id;

    const updatedMovie = await movie.save();
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};
const deleteMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    res.status(200).json("Movie has been deleted...");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};
