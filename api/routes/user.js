const express = require("express");
const router = express.Router();



const { authenticateJWT , checkBlacklist} = require("../middlewares/auth_JWT");
const userController = require("../controllers/user");
const hasPermission = require("../middlewares/hasPermission");

router.get("/profile",authenticateJWT, checkBlacklist, userController.getCurrentUserProfile);
router.post("/profile",authenticateJWT, checkBlacklist, userController.updateCurrentUserProfile);
router.get("/search/:id", authenticateJWT, checkBlacklist, hasPermission("READ", "USERS"), userController.searchUserById);
router.get("/search/username/:username", authenticateJWT, checkBlacklist, hasPermission("READ", "USERS"), userController.searchUserByUsername);
router.put("/block/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "USERS"), userController.blockUser);
router.put("/unblock/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "USERS"), userController.unblockUser);

module.exports = router;