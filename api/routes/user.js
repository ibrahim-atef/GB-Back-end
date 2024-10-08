const express = require("express");
const router = express.Router();


const isAuth = require("../middlewares/auth_JWT");
const isAuthRole = require("../middlewares/IsauthorizedRole");
const userController = require("../controllers/user");

router.get("/profile",isAuth,isAuthRole, userController.getCurrentUserProfile);

router.post("/profile",isAuth,isAuthRole, userController.updateCurrentUserProfile);

module.exports = router;