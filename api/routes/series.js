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
const SeriesController = require("../controllers/series");
const SearchController = require("../controllers/search");
const { authenticateJWT , checkBlacklist} = require("../middlewares/auth_JWT");

// Series CRUD routes
router.get("/fetch-series/:id", SeriesController.getSeriesById);
router.post("/add-series",authenticateJWT, checkBlacklist, SeriesController.createSeries);
router.put("/update-series/:id",authenticateJWT, checkBlacklist, SeriesController.updateSeries);
router.delete("/delete-series/:id",authenticateJWT, checkBlacklist, SeriesController.deleteSeries);

// Seasons CRUD routes
router.get("/fetch-season/:id", SeriesController.getSeriesPartById);
router.post("/add-season",authenticateJWT, checkBlacklist, SeriesController.addSeriesPart);
router.put("/update-season/:id",authenticateJWT, checkBlacklist, SeriesController.updateSeriesPartById);
router.delete("/delete-season/:id",authenticateJWT, checkBlacklist, SeriesController.deleteSeriesPartById);

// Upcoming Series
router.get("/upcoming-series", SeriesController.getUpcomingSeries);

// Pagination & Search
router.get("/series", SeriesController.getAllSeriesWithPagination);
router.get("/search-series", SearchController.searchSeries);



module.exports = router;
