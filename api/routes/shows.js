const express = require("express");
const router = express.Router();
const TvShowController = require("../controllers/TvShow");

// Route definitions
router.get("/", TvShowController.getAllTvShows); // Adjusted to match the app.use("/TvShows")
router.post("/", TvShowController.CreateTvShow);
router.get("/:id", TvShowController.getTvShowById);
router.put("/:id", TvShowController.updateTvShow);
router.delete("/:id", TvShowController.deleteTvShow);

module.exports = router;
