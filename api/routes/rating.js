const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const aggregationController = require('../controllers/aggregationController');
const { authenticateJWT, checkBlacklist } = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");

// Rate content
router.post('/rate', authenticateJWT, checkBlacklist, hasPermission("CREATE", "RATINGS"), ratingController.submitRating);

// Get average rating
router.get('/average-rating/:contentId', authenticateJWT, checkBlacklist, hasPermission("READ", "RATINGS"), aggregationController.getAverageRating);

module.exports = router;
