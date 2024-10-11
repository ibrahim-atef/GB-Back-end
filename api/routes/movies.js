const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");
const SearchController = require("../controllers/search");
const isAuth = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");

// Protect routes with CRUD-based permissions

// Fetch movie - users with READ permission on MOVIES can fetch movies
router.get("/fetch-movie/:id", isAuth, hasPermission("READ", "MOVIES"), MovieController.getMovieById);

// Add movie - users with CREATE permission on MOVIES can add movies
router.post("/add-movie", isAuth, hasPermission("CREATE", "MOVIES"), MovieController.createMovie);

// Update movie - users with UPDATE permission on MOVIES can update movies
router.put("/update-movie/:id", isAuth, hasPermission("UPDATE", "MOVIES"), MovieController.updateMovieById);

// Delete movie - users with DELETE permission on MOVIES can delete movies
router.delete("/delete-movie/:id", isAuth, hasPermission("DELETE", "MOVIES"), MovieController.deleteMovieById);

// Movie Parts CRUD routes
router.get("/fetch-movie-part/:id", isAuth, hasPermission("READ", "MOVIES"), MovieController.getMoviePartById);
router.post("/add-movie-part", isAuth, hasPermission("CREATE", "MOVIES"), MovieController.addMoviePart);
router.put("/update-movie-part/:id", isAuth, hasPermission("UPDATE", "MOVIES"), MovieController.updateMoviePartById);
router.delete("/delete-movie-part/:id", isAuth, hasPermission("DELETE", "MOVIES"), MovieController.deleteMoviePartById);

// Upcoming Movies
router.get("/upcoming-movies", MovieController.getUpcomingMovies);

// Pagination & Search
router.get("/movies", MovieController.getMoviesWithPagination);
router.get("/search-movies", SearchController.searchMovies);

module.exports = router;
