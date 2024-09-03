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

router.get("/tvshows", TvShowController.getAllTvShows);
router.post("/tvshows", TvShowController.CreateTvShow);
router.get("/tvshows/:id", TvShowController.getTvShowById);
router.put("/tvshows/:id", TvShowController.updateTvShow);
router.delete("/tvshows/:id", TvShowController.deleteTvShow);

module.exports = router;
