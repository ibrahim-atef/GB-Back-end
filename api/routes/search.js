const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/search");
const { authenticateJWT, checkBlacklist } = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");

// Global search across movies, series, tv shows
router.get("/search", authenticateJWT, checkBlacklist, hasPermission("READ", "SEARCH"), SearchController.globalSearch);

module.exports = router;
