/**
 * @author : Alaa Ayaad
 * @date : 28/09/2024
 *
 * @description : Controller functions to handle series CRUD operations.
 */

const Series = require("../models/Series");

/*** Create Series ***/
const createSeries = async (req, res) => {
  try {
    const newSeries = new Series(req.body);
    const savedSeries = await newSeries.save();
    res.status(201).json(savedSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get all series ***/
const getAllSeries = async (req, res) => {
  try {
    const series = await Series.find();
    res.status(200).json(series);
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

/*** Update series ***/
const updateSeries = async (req, res) => {
  try {
    const updatedSeries = await Series.findByIdAndUpdate(
      req.params.id,
      req.body,
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

module.exports = {
  createSeries,
  getAllSeries,
  getSeriesById,
  updateSeries,
  deleteSeries,
};
