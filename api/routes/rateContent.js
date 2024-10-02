const express = require("express");
const router = express.Router();
const rateContentController = require("../controllers/rateContent");

router.get("/rateContent", rateContentController.getTopRated);

module.exports = router
