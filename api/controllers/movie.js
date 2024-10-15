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

/*** Get All Movies (with Pagination) ***/
const getMoviesWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .skip(skip)
      .limit(limit);
    const totalMovies = await Movie.countDocuments(); // Total number of movies

    res.status(200).json({
      totalMovies,
      currentPage: page,
      totalPages: Math.ceil(totalMovies / limit),
      movies,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get Upcoming Movies ***/
const getUpcomingMovies = async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingMovies = await Movie.find({
      first_air_date: { $gt: currentDate }, // Movies with a future release date
    });

    res.status(200).json(upcomingMovies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Search Movies by Name ***/
// const searchMovies = async (req, res) => {
//   try {
//     const searchTerm = req.query.q;
//     const movies = await Movie.find({
//       name: { $regex: searchTerm, $options: "i" }, // Case-insensitive search by name
//     });

//     res.status(200).json(movies);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

/*** Search in All Models (Movies, Series, TV Shows) ***/
// Assuming there are controllers for Series and TvShow, you could import them here
// const Series = require("../models/Series");
// const TvShow = require("../models/TvShow");

// const searchAll = async (req, res) => {
//   try {
//     const searchTerm = req.query.q;
//     const movies = await Movie.find({
//       name: { $regex: searchTerm, $options: "i" },
//     });
//     const series = await Series.find({
//       title: { $regex: searchTerm, $options: "i" },
//     });
//     const tvShows = await TvShow.find({
//       title: { $regex: searchTerm, $options: "i" },
//     });

//     res.status(200).json({
//       movies,
//       series,
//       tvShows,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

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

/*** Movie Parts ***/
const getMoviePartById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie || !movie.parts) {
      return res.status(404).json({ message: "Movie or part not found!" });
    }

    const moviePart = movie.parts.find((part) => part.id === parseInt(req.params.partId));
    if (!moviePart) {
      return res.status(404).json({ message: "Part not found!" });
    }

    res.status(200).json(moviePart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addMoviePart = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found!" });
    }

    const newPart = { ...req.body, id: movie.parts.length + 1 };
    movie.parts.push(newPart);
    await movie.save();

    res.status(201).json(newPart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMoviePartById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie || !movie.parts) {
      return res.status(404).json({ message: "Movie or part not found!" });
    }

    const partIndex = movie.parts.findIndex((part) => part.id === parseInt(req.params.partId));
    if (partIndex === -1) {
      return res.status(404).json({ message: "Part not found!" });
    }

    movie.parts[partIndex] = { ...movie.parts[partIndex], ...req.body };
    await movie.save();

    res.status(200).json(movie.parts[partIndex]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMoviePartById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie || !movie.parts) {
      return res.status(404).json({ message: "Movie or part not found!" });
    }

    movie.parts = movie.parts.filter((part) => part.id !== parseInt(req.params.partId));
    await movie.save();

    res.status(200).json({ message: "Part deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createMovie,
  getMovieById,
  getMoviesWithPagination,
  getUpcomingMovies,
  // searchMovies,
  // searchAll,
  updateMovieById,
  deleteMovieById,
  getMoviePartById,
  addMoviePart,
  updateMoviePartById,
  deleteMoviePartById,
};
