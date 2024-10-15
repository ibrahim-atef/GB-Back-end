const express = require("express");
const router = express.Router();
const TvShowController = require("../controllers/TvShow");
const SearchController = require("../controllers/search");
const { authenticateJWT, checkBlacklist } = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");
const { validateSeasonId, validateTvShowId } = require("../middlewares/episodeSeasonValidator");
const {validateEpisode, validateSeason, validateTvShow } = require("../middlewares/validator");

// TvShow CRUD routes
router.get("/fetch-show/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "SHOWS"), TvShowController.getTvShowById);
router.post("/add-show", authenticateJWT, checkBlacklist, hasPermission("CREATE", "SHOWS"), validateTvShow, TvShowController.createTvShow);
router.put("/update-show/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "SHOWS"), validateTvShow, TvShowController.updateTvShowById);
router.delete("/delete-show/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "SHOWS"), TvShowController.deleteTvShowById);

// Upcoming Shows
router.get("/upcoming-shows", authenticateJWT, checkBlacklist, hasPermission("READ", "SHOWS"), TvShowController.getUpcomingTvShows,
);

// Pagination & Search
router.get("/shows", authenticateJWT, checkBlacklist, hasPermission("READ", "SHOWS"), TvShowController.getAllTvShowsWithPagination);
router.get("/search-shows", authenticateJWT, checkBlacklist, hasPermission("READ", "SHOWS"), SearchController.searchTvShows);

// Add Season Routes
router.get("/fetch-season/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "SHOWS"), TvShowController.getTvShowPartById);
router.post("/add-season", authenticateJWT, checkBlacklist, hasPermission("CREATE", "SHOWS"), validateSeasonId, validateTvShowId, validateSeason, TvShowController.addTvShowPart);
router.put("/update-season/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "SHOWS"), validateSeasonId, validateTvShowId, validateSeason, TvShowController.updateTvShowPartById);
router.delete("/delete-season/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "SHOWS"), TvShowController.deleteTvShowPartById);

//ADD EPISODE ROUTES

router.get("/fetch-episode/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "SHOWS"), TvShowController.getTvShowEpisodeById);
router.post("/add-episode", authenticateJWT, checkBlacklist, hasPermission("CREATE", "SHOWS"), validateSeasonId, validateTvShowId, validateEpisode, TvShowController.addTvShowEpisode);
router.put("/update-episode/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "SHOWS"), validateTvShowId, validateEpisode, TvShowController.updateTvShowEpisodeById);
router.delete("/delete-episode/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "SHOWS"), TvShowController.deleteTvShowEpisodeById);
//ADD VALIDATION 
module.exports = router;
