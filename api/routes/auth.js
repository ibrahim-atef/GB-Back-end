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

const { register, signIn, requestPasswordReset, resetPassword } = require("../controllers/auth");

router.post("/register", register);

router.post("/login", signIn);

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
