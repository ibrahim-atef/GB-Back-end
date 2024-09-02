/**
 * @author : Alaa Ayaad
 * @description : This file contains the routes for Series CRUD operations using method chaining
 * @date : 28/09/2024
 *
 * @param {Object} express - The Express module used to create the routes for series.
 * @param {Object} router - The Express router to define the routes.
 * @param {route} - Route to manage series.
 */

const express = require("express");
const router = express.Router();
const {
  createSeries,
  getAllSeries,
  getSeriesById,
  updateSeries,
  deleteSeries,
} = require("../controllers/seriesController");

// Routes for series collection
router.route("/series").get(getAllSeries).post(createSeries);

// Routes for a single series by ID
router
  .route("/series/:id")
  .get(getSeriesById)
  .put(updateSeries)
  .delete(deleteSeries);

module.exports = router;
