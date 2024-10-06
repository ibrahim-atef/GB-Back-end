const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");
const SearchController = require("../controllers/search");
const isAuth = require("../middlewares/auth_JWT");

// Movie CRUD routes
router.get("/fetch-movie/:id", MovieController.getMovieById);
router.post("/add-movie", isAuth, MovieController.createMovie);
router.put("/update-movie/:id", isAuth, MovieController.updateMovieById);
router.delete("/delete-movie/:id", isAuth, MovieController.deleteMovieById);

// Movie Parts CRUD routes
router.get("/fetch-movie-part/:id", MovieController.getMoviePartById);
router.post("/add-movie-part", isAuth, MovieController.addMoviePart);
router.put("/update-movie-part/:id", isAuth, MovieController.updateMoviePartById);
router.delete("/delete-movie-part/:id", isAuth, MovieController.deleteMoviePartById);

// Upcoming Movies
router.get("/upcoming-movies", MovieController.getUpcomingMovies);

// Pagination & Search
router.get("/movies", MovieController.getMoviesWithPagination);
router.get("/search-movies", SearchController.searchMovies);



module.exports = router;
