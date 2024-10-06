const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/search");

// Global search across movies, series, tv shows
router.get("/search", SearchController.globalSearch);

module.exports = router;