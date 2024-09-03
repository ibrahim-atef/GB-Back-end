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
    if (!series)
      return res.status(400).json({ message: "This series not found!" });
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    if (!updatedSeries)
      return res.status(404).json({ message: "Series not found" });
    res.status(200).json(updatedSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** delete Series ***/
const deleteSeries = async (req, res) => {
  try {
    const deletedSeries = await Series.findByIdAndDelete(req.params.id);
    if (!deletedSeries)
      return res.status(404).json({ message: "Series not found" });
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
