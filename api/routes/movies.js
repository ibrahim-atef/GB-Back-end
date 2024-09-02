const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");
const isAuth = require("../middlewares/auth_JWT");

router.get("/movies", MovieController.getAllMovies);
router.get("/movies/:id", MovieController.getMovieById);
router.post("/movies", isAuth, MovieController.createMovie);
router.put("/movies/:id", isAuth, MovieController.updateMovieById);
router.delete("/movies/:id", isAuth, MovieController.deleteMovieById);

module.exports = router;
