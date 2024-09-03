const express = require("express");
const router = express.Router();


const isAuth = require("../middlewares/auth_JWT");
const isAuthRole = require("../middlewares/IsauthorizedRole");
const userController = require("../controllers/user");

router.get("/profile",isAuth, userController.getCurrentUserProfile);

router.post("/profile",isAuth, userController.updateCurrentUserProfile);

module.exports = router;