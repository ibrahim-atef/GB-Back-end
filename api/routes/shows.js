const express = require("express");
const router = express.Router();
const TvShowController = require("../controllers/TvShow");
const SearchController = require("../controllers/search");
const { authenticateJWT, checkBlacklist } = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");

// TvShow CRUD routes
router.get("/fetch-show/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "SHOWS"), TvShowController.getTvShowById);
router.post("/add-show", authenticateJWT, checkBlacklist, hasPermission("CREATE", "SHOWS"), TvShowController.createTvShow);
router.put("/update-show/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "SHOWS"), TvShowController.updateTvShowById);
router.delete("/delete-show/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "SHOWS"), TvShowController.deleteTvShowById);

// Upcoming Shows
router.get("/upcoming-shows", authenticateJWT, checkBlacklist, hasPermission("READ", "SHOWS"), TvShowController.getUpcomingTvShows,
);

// Pagination & Search
router.get("/shows", authenticateJWT, checkBlacklist, hasPermission("READ", "SHOWS"), TvShowController.getAllTvShowsWithPagination);
router.get("/search-shows", authenticateJWT, checkBlacklist, hasPermission("READ", "SHOWS"), SearchController.searchTvShows);

module.exports = router;
