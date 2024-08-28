const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/admin");
const isAuth = require("../middlewares/auth_JWT");

router.get("/fetch-users", isAuth,getAllUsers);

module.exports = router;