/**
 * @author : Ameer Heiba
 * @description : Contains search functionalities for movies, series, and TV shows.
 * @date : 03/10/2024
 */

const Movie = require("../models/Movie");
const Series = require("../models/Series");
const TvShow = require("../models/TvShow");

/*** Global Search (Search by name in Movies, Series, TV Shows) ***/
const globalSearch = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    const movies = await Movie.find({ title: { $regex: searchTerm, $options: "i" } });
    const series = await Series.find({ title: { $regex: searchTerm, $options: "i" } });
    const tvShows = await TvShow.find({ title: { $regex: searchTerm, $options: "i" } });

    res.status(200).json({
      movies,
      series,
      tvShows,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Search in Movies ***/
const searchMovies = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const movies = await Movie.find({ title: { $regex: searchTerm, $options: "i" } });

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Search in Series ***/
const searchSeries = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const series = await Series.find({ title: { $regex: searchTerm, $options: "i" } });

    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Search in TV Shows ***/
const searchTvShows = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const tvShows = await TvShow.find({ title: { $regex: searchTerm, $options: "i" } });

    res.status(200).json(tvShows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  globalSearch,
  searchMovies,
  searchSeries,
  searchTvShows,
};
