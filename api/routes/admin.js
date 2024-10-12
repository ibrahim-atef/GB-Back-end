const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const { authenticateJWT , checkBlacklist} = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");

// Moderator routes
router.post("/register-moderator",authenticateJWT, hasPermission("CREATE", "MODERATORS"), adminController.registerModerator);
router.post("/login-moderator", adminController.signInModerator);

// Role management routes
router.post('/roles', authenticateJWT, checkBlacklist, hasPermission("CREATE", "ROLES"), adminController.createRole);
router.get('/roles', authenticateJWT, checkBlacklist, hasPermission("READ", "ROLES"), adminController.getAllRoles);
router.put('/roles/:roleId', authenticateJWT, checkBlacklist, hasPermission("UPDATE", "ROLES"), adminController.updateRole);
router.delete('/roles/:roleId', authenticateJWT, checkBlacklist, hasPermission("DELETE", "ROLES"), adminController.deleteRole);

// Permission management routes
router.post('/permissions', authenticateJWT, checkBlacklist, hasPermission("CREATE", "PERMISSIONS"), adminController.createPermission);
router.get('/permissions', authenticateJWT, checkBlacklist, hasPermission("READ", "PERMISSIONS"), adminController.getAllPermissions);
router.put('/permissions/:permissionId', authenticateJWT, checkBlacklist, hasPermission("UPDATE", "PERMISSIONS"), adminController.updatePermission);
router.delete('/permissions/:permissionId', authenticateJWT, checkBlacklist, hasPermission("DELETE", "PERMISSIONS"), adminController.deletePermission);

// Role-Permission association routes
router.post('/roles/:roleId/permissions', authenticateJWT, checkBlacklist, hasPermission("UPDATE", "ROLES"), adminController.addPermissionToRole);
router.delete('/roles/:roleId/permissions/:permissionId', authenticateJWT, checkBlacklist, hasPermission("UPDATE", "ROLES"), adminController.removePermissionFromRole);

// Fetch all users
router.get("/fetch-users", authenticateJWT, checkBlacklist, hasPermission("READ", "USERS"), adminController.getAllUsers);

module.exports = router;
