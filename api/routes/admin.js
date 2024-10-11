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
const adminController = require("../controllers/admin");
const isAuth = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");

// Moderator routes
router.post("/register-moderator", adminController.registerModerator);
router.post("/login-moderator", adminController.signInModerator);

// Role management routes
/**
 * @route POST /roles
 * @description Create a new role
 * @access private
 * @middleware isAuth, hasPermission("CREATE", "ROLES")
 */
router.post('/roles', isAuth, hasPermission("CREATE", "ROLES"), adminController.createRole);

/**
 * @route GET /roles
 * @description Get all roles
 * @access private
 * @middleware isAuth, hasPermission("READ", "ROLES")
 */
router.get('/roles', isAuth, hasPermission("READ", "ROLES"), adminController.getAllRoles);

/**
 * @route PUT /roles/:roleId
 * @description Update a specific role
 * @access private
 * @middleware isAuth, hasPermission("UPDATE", "ROLES")
 */
router.put('/roles/:roleId', isAuth, hasPermission("UPDATE", "ROLES"), adminController.updateRole);

/**
 * @route DELETE /roles/:roleId
 * @description Delete a specific role
 * @access private
 * @middleware isAuth, hasPermission("DELETE", "ROLES")
 */
router.delete('/roles/:roleId', isAuth, hasPermission("DELETE", "ROLES"), adminController.deleteRole);

// Permission management routes
/**
 * @route POST /permissions
 * @description Create a new permission
 * @access private
 * @middleware isAuth, hasPermission("CREATE", "PERMISSIONS")
 */
router.post('/permissions', isAuth, hasPermission("CREATE", "PERMISSIONS"), adminController.createPermission);

/**
 * @route GET /permissions
 * @description Get all permissions
 * @access private
 * @middleware isAuth, hasPermission("READ", "PERMISSIONS")
 */
router.get('/permissions', isAuth, hasPermission("READ", "PERMISSIONS"), adminController.getAllPermissions);

/**
 * @route PUT /permissions/:permissionId
 * @description Update a specific permission
 * @access private
 * @middleware isAuth, hasPermission("UPDATE", "PERMISSIONS")
 */
router.put('/permissions/:permissionId', isAuth, hasPermission("UPDATE", "PERMISSIONS"), adminController.updatePermission);

/**
 * @route DELETE /permissions/:permissionId
 * @description Delete a specific permission
 * @access private
 * @middleware isAuth, hasPermission("DELETE", "PERMISSIONS")
 */
router.delete('/permissions/:permissionId', isAuth, hasPermission("DELETE", "PERMISSIONS"), adminController.deletePermission);

// Role-Permission association routes
/**
 * @route POST /roles/:roleId/permissions/:permissionId
 * @description Add a permission to a role
 * @access private
 * @middleware isAuth, hasPermission("UPDATE", "ROLES")
 */
router.post('/roles/:roleId/permissions/:permissionId', isAuth, hasPermission("UPDATE", "ROLES"), adminController.addPermissionToRole);

/**
 * @route DELETE /roles/:roleId/permissions/:permissionId
 * @description Remove a permission from a role
 * @access private
 * @middleware isAuth, hasPermission("UPDATE", "ROLES")
 */
router.delete('/roles/:roleId/permissions/:permissionId', isAuth, hasPermission("UPDATE", "ROLES"), adminController.removePermissionFromRole);

// Fetch all users
router.get("/fetch-users", isAuth, hasPermission("READ", "USERS"), adminController.getAllUsers);

module.exports = router;
