/**
 * @author : Shehab gamal
 * @description : This file contains the TvShow Mongo Model
 * @date : 27/09/2022
 *
 * @param {Object} mongoose - The Mongoose module used to create the model.
 * @param {Object} TvShowRouter - The Mongoose schema used to create the model.
 * @param {Function} Router - The Express router to define the routes.
 *
 *
 */

const express = require("express");
const router = express.Router();

const TvShowController = require("../controllers/TvShow");


router.get("/TvShows", TvShowController.getAllTvShows);
router.post("/TvShows", TvShowController.CreateTvShow);
router.get("/TvShows/:id", TvShowController.getTvShow);
router.put("/TvShows/:id", TvShowController.updateTvShow);
router.delete("/TvShows/:id", TvShowController.deleteTvShow);

module.exports = router;