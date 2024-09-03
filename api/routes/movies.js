const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");
const isAuth = require("../middlewares/auth_JWT");

router.get("/movies", MovieController.getAllMovies);
router.get("/fetch-movie/:id", MovieController.getMovieById);
router.post("/add-movie", isAuth, MovieController.createMovie);
router.put("/update-movie/:id", isAuth, MovieController.updateMovieById);
router.delete("/delete-movie/:id", isAuth, MovieController.deleteMovieById);

module.exports = router;
