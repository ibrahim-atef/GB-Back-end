const { body, validationResult } = require("express-validator");

// Function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.array(),
    });
  }
  next();
};

// Validate Movie
const validateMovie = [
  body("name").notEmpty().withMessage("Name is required."),
  body("overview").notEmpty().withMessage("Overview is required."),
  body("poster_path").isURL().withMessage("Poster path must be a valid URL."),
  body("poster_Title").notEmpty().withMessage("Poster Title is required."),
  body("imgSm").isURL().withMessage("Small image must be a valid URL."),
  body("backdrop_path")
    .isURL()
    .withMessage("Backdrop path must be a valid URL."),
  body("first_air_date")
    .isISO8601()
    .withMessage("First air date must be a valid date in ISO8601 format."),
  body("trailer").isURL().withMessage("Trailer must be a valid URL."),
  body("language")
    .isArray()
    .withMessage("Language must be an array.")
    .notEmpty()
    .withMessage("Language array cannot be empty."),
  body("releaseYear").notEmpty().withMessage("Release year is required."),
  body("genre")
    .isArray()
    .withMessage("Genre must be an array.")
    .notEmpty()
    .withMessage("Genre array cannot be empty."),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5."),
  handleValidationErrors,
];

// Validate Series
const validateSeries = [
  body("title").notEmpty().withMessage("Title is required."),
  body("desc").notEmpty().withMessage("Description is required."),
  body("img").isURL().withMessage("Image must be a valid URL."),
  body("imgTitle").notEmpty().withMessage("Image Title is required."),
  body("imgSm").isURL().withMessage("Small image must be a valid URL."),
  body("trailer").isURL().withMessage("Trailer must be a valid URL."),
  body("language").isArray().withMessage("Language must be an array."),
  body("avgRuntime").notEmpty().withMessage("Average runtime is required."),
  body("releaseYear").notEmpty().withMessage("Release year is required."),
  body("genre").isArray().withMessage("Genre must be an array."),
  body("createdBy").isNumeric().withMessage("CreatedBy must be a number."),
  body("updatedBy").isNumeric().withMessage("UpdatedBy must be a number."),
  handleValidationErrors,
];

// Validate TV Show
const validateTvShow = [
  body("title").notEmpty().withMessage("Title is required."),
  body("desc").notEmpty().withMessage("Description is required."),
  body("img").isURL().withMessage("Image must be a valid URL."),
  body("imgTitle").notEmpty().withMessage("Image Title is required."),
  body("imgSm").isURL().withMessage("Small image must be a valid URL."),
  body("trailer").isURL().withMessage("Trailer must be a valid URL."),
  body("language").isArray().withMessage("Language must be an array."),
  body("releaseYear").notEmpty().withMessage("Release year is required."),
  body("genre").isArray().withMessage("Genre must be an array."),
  body("createdBy").isNumeric().withMessage("CreatedBy must be a number."),
  body("updatedBy").isNumeric().withMessage("UpdatedBy must be a number."),
  handleValidationErrors,
];

// Validate Category
const validateCategory = [
  body("name").notEmpty().withMessage("Category name is required."),
  handleValidationErrors,
];

// Validate Episode
const validateEpisode = [
  body("seasonId").isMongoId().withMessage("Invalid Season ID."),
  body("episodeNumber")
    .isNumeric()
    .withMessage("Episode number must be a number."),
  body("episodeTitle").notEmpty().withMessage("Episode title is required."),
  body("episodeDesc")
    .optional()
    .isString()
    .withMessage("Episode description must be a string."),
  body("time").optional().isString().withMessage("Time must be a string."),
  body("episodeImage")
    .optional()
    .isURL()
    .withMessage("Episode image must be a valid URL."),
  body("videoUrl").isURL().withMessage("Video URL must be a valid URL."),
  handleValidationErrors,
];

// Validate Movie Part
const validateMoviePart = [
  body("movieId").isMongoId().withMessage("Invalid Movie ID."),
  body("releaseYear")
    .optional()
    .isString()
    .withMessage("Release Year must be a string."),
  body("movieTitle").notEmpty().withMessage("Movie Title is required."),
  body("movieDesc").notEmpty().withMessage("Movie Description is required."),
  body("moviePoster").isURL().withMessage("Movie Poster must be a valid URL."),
  body("videoUrl").isURL().withMessage("Video URL must be a valid URL."),
  handleValidationErrors,
];

// Validate Season
const validateSeason = [
  body("seriesId").optional().isMongoId().withMessage("Invalid Series ID."),
  body("tvShowId").optional().isMongoId().withMessage("Invalid TV Show ID."),
  body("seasonTitle").notEmpty().withMessage("Season Title is required."),
  body("seasonDesc")
    .optional()
    .isString()
    .withMessage("Season Description must be a string."),
  body("seasonPoster")
    .optional()
    .isURL()
    .withMessage("Season Poster must be a valid URL."),
  body("releaseYear")
    .optional()
    .isString()
    .withMessage("Release Year must be a string."),
  body("episodes")
    .optional()
    .isArray()
    .withMessage("Episodes must be an array."),
  handleValidationErrors,
];

// Export validators
module.exports = {
  validateMovie,
  validateSeries,
  validateTvShow,
  validateCategory,
  validateEpisode,
  validateMoviePart,
  validateSeason,
};
