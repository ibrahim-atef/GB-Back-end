const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
const { authenticateJWT, checkBlacklist } = require("../middlewares/auth_JWT");
const hasPermission = require("../middlewares/hasPermission");
const { validateCategory } = require("../middlewares/validator");

// Full CRUD routes for Category
router.get("/fetch-category/:id", CategoryController.getCategoryById);
router.get("/fetch-all-categories", authenticateJWT, checkBlacklist, hasPermission("READ", "CATEGORIES"), CategoryController.getAllCategories);
router.post("/add-category", authenticateJWT, checkBlacklist, hasPermission("CREATE", "CATEGORIES"), validateCategory, CategoryController.createCategory);
router.put("/update-category/:id", authenticateJWT, checkBlacklist, hasPermission("UPDATE", "CATEGORIES"), validateCategory, CategoryController.updateCategoryById);
router.delete("/delete-category/:id", authenticateJWT, checkBlacklist, hasPermission("DELETE", "CATEGORIES"), CategoryController.deleteCategoryById);

module.exports = router;
