const express = require("express");
const { authenticateJWT, checkBlacklist } = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");
const router = express.Router();

const {
  register,
  signIn,
  registerAdmin,
  signInAdmin,
  registerModerator,
  signInModerator,
  requestPasswordReset,
  resetPassword,
  logoutUser
} = require("../controllers/auth");

// Regular user routes
router.post("/register", register);
router.post("/login", signIn);

// Admin routes
router.post("/register-admin", authenticateJWT, checkBlacklist, hasPermission("CREATE", "ADMINS"), registerAdmin);
router.post("/login-admin", signInAdmin);

// Moderator routes
router.post("/register-moderator", authenticateJWT, checkBlacklist, hasPermission("CREATE", "MODERATORS"), registerModerator);
router.post("/login-moderator", signInModerator);

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

// Logout
router.get("/logout", authenticateJWT, checkBlacklist, logoutUser);

module.exports = router;
