const express = require("express");
const router = express.Router();



const { authenticateJWT , checkBlacklist} = require("../middlewares/auth_JWT");
const userController = require("../controllers/user");

router.get("/profile",authenticateJWT, checkBlacklist, userController.getCurrentUserProfile);

router.post("/profile",authenticateJWT, checkBlacklist, userController.updateCurrentUserProfile);

module.exports = router;