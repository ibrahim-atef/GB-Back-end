/**
 * @author : Alaa Ayaad
 * @description : This file contains the routes for Series
 * @date : 28/09/2024
 *
 * @param {Object} express - The Express module used to create the routes of seies.
 * @param {Object} router - The Express router to define the routes.
 * @param {route} - route to get all Series.
 
 */

const express = require("express");
const router = express.Router();
const { getAll } = require("../controllers/seriesController");
router.get("/series", getAll);

module.exports = router;
