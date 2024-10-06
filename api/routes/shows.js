/**
 * @author : Shehab gamal
 * @description : This file contains the TvShow routers
 * @date : 2/09/2024
 *
 * @param {Object} TvShowRouter - The Mongoose schema used to create the model.
 * @param {Function} Router - The Express router to define the routes.
 * @param {Function} TvShowController - The Mongoose Controller used to create the model.
 * @param {Function} controllers - The Mongoose Controller used to create the model.
 * 
 *
 *
 */

const express = require("express");
const router = express.Router();
const TvShowController = require("../controllers/TvShow");
const SearchController = require("../controllers/search");
const isAuth = require("../middlewares/auth_JWT");

// TvShow CRUD routes
router.get("/fetch-tvshow/:id", TvShowController.getTvShowById);
router.post("/add-tvshow", isAuth, TvShowController.createTvShow);
router.put("/update-tvshow/:id", isAuth, TvShowController.updateTvShowById);
router.delete("/delete-tvshow/:id", isAuth, TvShowController.deleteTvShowById);

// Seasons CRUD routes
router.get("/fetch-season/:id", TvShowController.getTvShowPartById);
router.post("/add-season", isAuth, TvShowController.addTvShowPart);
router.put("/update-season/:id", isAuth, TvShowController.updateTvShowPartById);
router.delete("/delete-season/:id", isAuth, TvShowController.deleteTvShowPartById);

// Upcoming TvShows
router.get("/upcoming-tvshows", TvShowController.getUpcomingTvShows);

// Pagination & Search
router.get("/tvshows", TvShowController.getAllTvShowsWithPagination);
router.get("/search-tvshows", SearchController.searchTvShows);


module.exports = router;
