const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const isAuth = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");

// Moderator routes
router.post("/register-moderator", isAuth, hasPermission("CREATE", "MODERATORS"), adminController.registerModerator);
router.post("/login-moderator", adminController.signInModerator);

// Role management routes
router.post('/roles', isAuth, hasPermission("CREATE", "ROLES"), adminController.createRole);
router.get('/roles', isAuth, hasPermission("READ", "ROLES"), adminController.getAllRoles);
router.put('/roles/:roleId', isAuth, hasPermission("UPDATE", "ROLES"), adminController.updateRole);
router.delete('/roles/:roleId', isAuth, hasPermission("DELETE", "ROLES"), adminController.deleteRole);

// Permission management routes
router.post('/permissions', isAuth, hasPermission("CREATE", "PERMISSIONS"), adminController.createPermission);
router.get('/permissions', isAuth, hasPermission("READ", "PERMISSIONS"), adminController.getAllPermissions);
router.put('/permissions/:permissionId', isAuth, hasPermission("UPDATE", "PERMISSIONS"), adminController.updatePermission);
router.delete('/permissions/:permissionId', isAuth, hasPermission("DELETE", "PERMISSIONS"), adminController.deletePermission);

// Role-Permission association routes
router.post('/roles/:roleId/permissions', isAuth, hasPermission("UPDATE", "ROLES"), adminController.addPermissionToRole);
router.delete('/roles/:roleId/permissions/:permissionId', isAuth, hasPermission("UPDATE", "ROLES"), adminController.removePermissionFromRole);

// Fetch all users
router.get("/fetch-users", isAuth, hasPermission("READ", "USERS"), adminController.getAllUsers);

module.exports = router;
