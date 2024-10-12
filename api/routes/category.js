/**
 * @author : Ameer Heiba
 * @description : This file contains the Category routes.
 * @date : [Current Date]
 */

const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
const { authenticateJWT , checkBlacklist} = require("../middlewares/auth_JWT");

// Full CRUD routes for Category
router.get("/fetch-category/:id", CategoryController.getCategoryById);
router.get("/fetch-all-categories", CategoryController.getAllCategories);
router.post("/add-category", authenticateJWT, checkBlacklist, CategoryController.createCategory);
router.put("/update-category/:id", authenticateJWT, checkBlacklist, CategoryController.updateCategoryById);
router.delete("/delete-category/:id", authenticateJWT, checkBlacklist, CategoryController.deleteCategoryById);

module.exports = router;
