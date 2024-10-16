const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");
const SearchController = require("../controllers/search");
const { authenticateJWT, checkBlacklist } = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");
const { validateMovie, validateMoviePart } = require("../middlewares/validator");

// Protect routes with CRUD-based permissions
router.get("/fetch-movie/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "MOVIES"), MovieController.getMovieById);
router.post("/add-movie", authenticateJWT, checkBlacklist, hasPermission("CREATE", "MOVIES"), validateMovie, MovieController.createMovie);
router.put("/update-movie/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "MOVIES"),  MovieController.updateMovieById);
router.delete("/delete-movie/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "MOVIES"), MovieController.deleteMovieById);

// Movie Parts CRUD routes
router.get("/fetch-movie-part/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "MOVIES"), MovieController.getMoviePartById);
router.post("/add-movie-part", authenticateJWT, checkBlacklist, hasPermission("CREATE", "MOVIES"), validateMoviePart, MovieController.addMoviePart);
router.put("/update-movie-part/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "MOVIES"), validateMoviePart, MovieController.updateMoviePartById);
router.delete("/delete-movie-part/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "MOVIES"), MovieController.deleteMoviePartById);

// Upcoming Movies
router.get("/upcoming-movies", authenticateJWT, checkBlacklist, MovieController.getUpcomingMovies);

// Pagination & Search
router.get("/movies", authenticateJWT, checkBlacklist, MovieController.getMoviesWithPagination);
router.get("/search-movies", authenticateJWT, checkBlacklist, SearchController.searchMovies);

module.exports = router;
