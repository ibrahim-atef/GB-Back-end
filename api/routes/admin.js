/**
 * Admin Routes
 * 
 * This module defines the routes for the admin section of the application.
 * 
 * @module adminRoutes
 */

/**
 * 
 * @author : Ameer Heiba
 * @description : This route is protected by the isAuth and isAuthRole middlewares, which ensure that only authenticated admins can access it.
 * @date : 01/09/2024
 * Define the route for fetching all users.
 * 
 * This route is protected by the isAuth and isAuthRole middlewares, which ensure that only authenticated admins can access it.
 * 
 * @route GET /fetch-users
 * @access private
 * @middleware isAuth, isAuthRole("admin")
 * @response {200} - An array of user objects.
 * @response {500} - An error message.
 */

const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/admin");
const isAuth = require("../middlewares/auth_JWT");
const isAuthRole = require("../middlewares/IsauthorizedRole");

router.get("/fetch-users", isAuth, isAuthRole("admin"),getAllUsers);

module.exports = router;