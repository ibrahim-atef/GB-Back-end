/**
 * @author : Ameer Heiba
 * @description : This file contains the Category controller functions.
 * @date : [Current Date]
 */

const Category = require("../models/Category");

/*** Create Category ***/
const createCategory = async (req, res) => {
  try {
    const categoryData = {
      ...req.body,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    };

    const newCategory = new Category(categoryData);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get Category by ID ***/
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Get All Categories ***/
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Update Category by ID ***/
const updateCategoryById = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.id,
      },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found!" });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*** Delete Category by ID ***/
const deleteCategoryById = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found!" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
};
