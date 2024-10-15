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

// Helper functions for reusable validation rules
const isRequired = (field) =>
  body(field).notEmpty().withMessage(`${field} is required.`);
const isValidUrl = (field) =>
  body(field).isURL().withMessage(`${field} must be a valid URL.`);
const isArray = (field) =>
  body(field).isArray().withMessage(`${field} must be an array.`);
const isNumeric = (field) =>
  body(field).isNumeric().withMessage(`${field} must be a number.`);
const isString = (field) =>
  body(field).isString().withMessage(`${field} must be a string.`);
const isMongoId = (field) =>
  body(field).isMongoId().withMessage(`Invalid ${field}.`);

// Common fields used in multiple validations
const commonFields = [
  isRequired("title"),
  isRequired("desc"),
  isValidUrl("img"),
  isRequired("imgTitle"),
  isValidUrl("imgSm"),
  isValidUrl("trailer"),
  isArray("language"),
  isArray("genre"),
  isNumeric("createdBy"),
  isNumeric("updatedBy"),
];

// Validator functions for each entity
const validateMovie = [
  isRequired("name"),
  isRequired("overview"),
  isValidUrl("poster_path"),
  isRequired("poster_Title"),
  isValidUrl("imgSm"),
  isValidUrl("backdrop_path"),
  body("first_air_date")
    .isISO8601()
    .withMessage("First air date must be a valid ISO8601 date."),
  isValidUrl("trailer"),
  isArray("language").notEmpty().withMessage("Language array cannot be empty."),
  isRequired("releaseYear"),
  isArray("genre").notEmpty().withMessage("Genre array cannot be empty."),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5."),
  handleValidationErrors,
];

const validateSeries = [
  ...commonFields,
  isRequired("avgRuntime"),
  isRequired("releaseYear"),
  handleValidationErrors,
];

const validateTvShow = [
  ...commonFields,
  isRequired("releaseYear"),
  handleValidationErrors,
];

const validateCategory = [isRequired("name"), handleValidationErrors];

const validateEpisode = [
  isMongoId("seasonId"),
  isNumeric("episodeNumber"),
  isRequired("episodeTitle"),
  body("episodeDesc")
    .optional()
    .isString()
    .withMessage("Episode description must be a string."),
  body("time").optional().isString().withMessage("Time must be a string."),
  isValidUrl("episodeImage"),
  isValidUrl("videoUrl"),
  handleValidationErrors,
];

const validateMoviePart = [
  isMongoId("movieId"),
  body("releaseYear")
    .optional()
    .isString()
    .withMessage("Release Year must be a string."),
  isRequired("movieTitle"),
  isRequired("movieDesc"),
  isValidUrl("moviePoster"),
  isValidUrl("videoUrl"),
  handleValidationErrors,
];

const validateSeason = [
  isMongoId("seriesId").optional(),
  isMongoId("tvShowId").optional(),
  isRequired("seasonTitle"),
  body("seasonDesc")
    .optional()
    .isString()
    .withMessage("Season Description must be a string."),
  isValidUrl("seasonPoster"),
  body("releaseYear")
    .optional()
    .isString()
    .withMessage("Release Year must be a string."),
  isArray("episodes").optional(),
  handleValidationErrors,
];

// General Error Handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const responseBody = {
    message: "Something went wrong!",
    stack: err.stack, // No conditional environment check
  };

  console.error("Error:", responseBody);
  res.json(responseBody);
};

// Export validators
module.exports = {
  validateMovie,
  validateSeries,
  validateTvShow,
  validateCategory,
  validateEpisode,
  validateMoviePart,
  validateSeason,
  errorHandler, 
};
