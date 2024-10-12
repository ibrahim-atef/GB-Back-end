const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");
const SearchController = require("../controllers/search");
const { authenticateJWT , checkBlacklist} = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");
const {validateMovie}= require("../middlewares/validator");

// Protect routes with CRUD-based permissions

// Fetch movie - users with READ permission on MOVIES can fetch movies
router.get("/fetch-movie/:id",authenticateJWT, checkBlacklist, hasPermission("READ", "MOVIES"), MovieController.getMovieById);

// Add movie - users with CREATE permission on MOVIES can add movies
router.post("/add-movie",authenticateJWT, checkBlacklist, hasPermission("CREATE", "MOVIES"),validateMovie ,MovieController.createMovie);

// Update movie - users with UPDATE permission on MOVIES can update movies
router.put("/update-movie/:id",authenticateJWT, checkBlacklist, hasPermission("UPDATE", "MOVIES"), MovieController.updateMovieById);

// Delete movie - users with DELETE permission on MOVIES can delete movies
router.delete("/delete-movie/:id",authenticateJWT, checkBlacklist, hasPermission("DELETE", "MOVIES"), MovieController.deleteMovieById);

// Movie Parts CRUD routes
router.get("/fetch-movie-part/:id",authenticateJWT, checkBlacklist, hasPermission("READ", "MOVIES"), MovieController.getMoviePartById);
router.post("/add-movie-part",authenticateJWT, checkBlacklist, hasPermission("CREATE", "MOVIES"), MovieController.addMoviePart);
router.put("/update-movie-part/:id",authenticateJWT, checkBlacklist, hasPermission("UPDATE", "MOVIES"), MovieController.updateMoviePartById);
router.delete("/delete-movie-part/:id",authenticateJWT, checkBlacklist, hasPermission("DELETE", "MOVIES"), MovieController.deleteMoviePartById);

// Upcoming Movies
router.get("/upcoming-movies", MovieController.getUpcomingMovies);

// Pagination & Search
router.get("/movies", MovieController.getMoviesWithPagination);
router.get("/search-movies", SearchController.searchMovies);

module.exports = router;
