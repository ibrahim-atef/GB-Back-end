const express = require("express");
const router = express.Router();
const SeriesController = require("../controllers/series");
const SearchController = require("../controllers/search");
const { authenticateJWT, checkBlacklist } = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");
const {validateSeasonId, validateSeriesId} = require("../middlewares/episodeSeasonValidator");
const { validateSeries, validateEpisode, validateSeason } = require("../middlewares/validator");

// Series CRUD routes
router.get("/fetch-series/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "SERIES"), SeriesController.getSeriesById);
router.post("/add-series", authenticateJWT, checkBlacklist, hasPermission("CREATE", "SERIES"), validateSeries, SeriesController.createSeries);
router.put("/update-series/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "SERIES"), validateSeries, SeriesController.updateSeries);
router.delete("/delete-series/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "SERIES"), SeriesController.deleteSeries);

// Seasons CRUD routes
router.get("/fetch-season/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "SERIES"), SeriesController.getSeriesPartById);
router.post("/add-season", authenticateJWT, checkBlacklist, hasPermission("CREATE", "SERIES"),validateSeriesId, validateSeason, SeriesController.addSeriesPart);
router.put("/update-season/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "SERIES"), validateSeriesId, validateSeason, SeriesController.updateSeriesPartById);
router.delete("/delete-season/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "SERIES"), SeriesController.deleteSeriesPartById);

// Upcoming Series
router.get("/upcoming-series", authenticateJWT, checkBlacklist, hasPermission("READ", "SERIES"), SeriesController.getUpcomingSeries);

// Pagination & Search
router.get("/series", authenticateJWT, checkBlacklist, SeriesController.getAllSeriesWithPagination);
router.get("/search-series", authenticateJWT, checkBlacklist, SearchController.searchSeries);

//ADD EPISODE ROUTES 

router.get("/fetch-episode/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "SERIES"), SeriesController.getSeriesEpisodeById);
router.post("/add-episode", authenticateJWT, checkBlacklist, hasPermission("CREATE", "SERIES"), validateSeasonId, validateEpisode, SeriesController.addSeriesEpisode);
router.put(  "/update-episode", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "SERIES"), validateSeasonId, validateEpisode, SeriesController.updateSeriesEpisodeById);
router.delete("/delete-episode/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "SERIES"), SeriesController.deleteSeriesEpisodeById);

//ADD VALIDATION

module.exports = router;
