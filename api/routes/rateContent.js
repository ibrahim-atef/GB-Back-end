const express = require("express");
const router = express.Router();
const rateContentController = require("../controllers/rateContent");
const { authenticateJWT , checkBlacklist} = require("../middlewares/auth_JWT");

router.post("/rateContent", rateContentController.rateContent);
router.get("/rateContent", rateContentController.getTopRated);

module.exports = router
