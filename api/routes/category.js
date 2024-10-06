/**
 * @author : Ameer Heiba
 * @description : This file contains the Category routes.
 * @date : [Current Date]
 */

const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
const isAuth = require("../middleware/isAuth");

// Full CRUD routes for Category
router.get("/fetch-category/:id", CategoryController.getCategoryById);
router.get("/fetch-all-categories", CategoryController.getAllCategories);
router.post("/add-category", isAuth, CategoryController.createCategory);
router.put("/update-category/:id", isAuth, CategoryController.updateCategoryById);
router.delete("/delete-category/:id", isAuth, CategoryController.deleteCategoryById);

module.exports = router;
