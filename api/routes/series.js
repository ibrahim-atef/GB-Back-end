const express = require("express");
const router = express.Router();
const SeriesController = require("../controllers/series");
const SearchController = require("../controllers/search");
const { authenticateJWT, checkBlacklist } = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");

// Series CRUD routes
router.get("/fetch-series/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "SERIES"), SeriesController.getSeriesById);
router.post("/add-series", authenticateJWT, checkBlacklist, hasPermission("CREATE", "SERIES"), SeriesController.createSeries);
router.put("/update-series/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "SERIES"), SeriesController.updateSeries);
router.delete("/delete-series/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "SERIES"), SeriesController.deleteSeries);

// Seasons CRUD routes
router.get("/fetch-season/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "SERIES"), SeriesController.getSeriesPartById);
router.post("/add-season", authenticateJWT, checkBlacklist, hasPermission("CREATE", "SERIES"), SeriesController.addSeriesPart);
router.put("/update-season/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "SERIES"), SeriesController.updateSeriesPartById);
router.delete("/delete-season/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "SERIES"), SeriesController.deleteSeriesPartById);

// Upcoming Series
router.get("/upcoming-series", authenticateJWT, checkBlacklist, hasPermission("READ", "SERIES"), SeriesController.getUpcomingSeries);

// Pagination & Search
router.get("/series", authenticateJWT, checkBlacklist, hasPermission("READ", "SERIES"), SeriesController.getAllSeriesWithPagination);
router.get("/search-series", authenticateJWT, checkBlacklist, hasPermission("READ", "SERIES"), SearchController.searchSeries);

module.exports = router;
