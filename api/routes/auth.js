/**
 * @author : Ameer Heiba
 * @description : This file contains the routes for authentication
 * @date : 01/09/2024
 * 
 * @param {Object} express - The Express module used to create the server.
 * @param {Object} router - The Express router to define the routes.
 * @param {Function} register - Controller function to handle user registration.
 * @param {Function} login - Controller function to handle user login.
 * @param {Function} requestPasswordReset - Controller function to handle password reset request.
 * @param {Function} resetPassword - Controller function to handle password reset.
 * 
 */

const express = require("express");
const router = express.Router();

const {
  register,
  signIn,
  registerAdmin,
  signInAdmin,
  registerModerator,
  signInModerator,
  requestPasswordReset,
  resetPassword
} = require("../controllers/auth");

// Regular user routes
router.post("/register", register);
router.post("/login", signIn);

// Admin routes
router.post("/register-admin", registerAdmin);
router.post("/login-admin", signInAdmin);

// Moderator routes
router.post("/register-moderator", registerModerator);
router.post("/login-moderator", signInModerator);

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
