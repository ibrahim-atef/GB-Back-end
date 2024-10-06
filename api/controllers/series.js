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
    const seriesData = {
      ...req.body,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    };

    const newSeries = new Series(seriesData);
    const savedSeries = await newSeries.save();
    res.status(201).json(savedSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get all series (with pagination) ***/
const getAllSeriesWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
    const skip = (page - 1) * limit;

    const series = await Series.find()
      .skip(skip)
      .limit(limit);
    const totalSeries = await Series.countDocuments();

    res.status(200).json({
      totalSeries,
      currentPage: page,
      totalPages: Math.ceil(totalSeries / limit),
      series,
    });
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

/*** Get upcoming series ***/
const getUpcomingSeries = async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingSeries = await Series.find({
      release_date: { $gt: currentDate },
    });

    res.status(200).json(upcomingSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Search series by name ***/
const searchSeries = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const series = await Series.find({
      title: { $regex: searchTerm, $options: "i" },
    });

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
      {
        ...req.body,
        updatedBy: req.user.id,
      },
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

/*** Get Series Part by ID ***/
const getSeriesPartById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series || !series.parts) {
      return res.status(404).json({ message: "Series or part not found!" });
    }

    const part = series.parts.find((part) => part.id === parseInt(req.params.partId));
    if (!part) {
      return res.status(404).json({ message: "Part not found!" });
    }

    res.status(200).json(part);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Add Series Part ***/
const addSeriesPart = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) {
      return res.status(404).json({ message: "Series not found!" });
    }

    const newPart = { ...req.body, id: series.parts.length + 1 };
    series.parts.push(newPart);
    await series.save();

    res.status(201).json(newPart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Update Series Part by ID ***/
const updateSeriesPartById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series || !series.parts) {
      return res.status(404).json({ message: "Series or part not found!" });
    }

    const partIndex = series.parts.findIndex((part) => part.id === parseInt(req.params.partId));
    if (partIndex === -1) {
      return res.status(404).json({ message: "Part not found!" });
    }

    series.parts[partIndex] = { ...series.parts[partIndex], ...req.body };
    await series.save();

    res.status(200).json(series.parts[partIndex]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Delete Series Part by ID ***/
const deleteSeriesPartById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series || !series.parts) {
      return res.status(404).json({ message: "Series or part not found!" });
    }

    series.parts = series.parts.filter((part) => part.id !== parseInt(req.params.partId));
    await series.save();

    res.status(200).json({ message: "Part deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSeries,
  getAllSeriesWithPagination,
  getSeriesById,
  getUpcomingSeries,
  searchSeries,
  updateSeries,
  deleteSeries,
  getSeriesPartById,
  addSeriesPart,
  updateSeriesPartById,
  deleteSeriesPartById,
};
