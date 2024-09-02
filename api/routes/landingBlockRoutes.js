
/**
 * @author : Ibrahim Atef
 * @description : This file contains the routes for handling CRUD operations
 *                 on LandingBlock entities and serving their images.
 * @date : 01/09/2024
 *
 * @param {Object} express - The Express module used to create the router.
 * @param {Object} router - The Express router used to define routes.
 * @param {Object} LandingBlockController - The controller used to handle requests.
 *
 */
const express = require("express");
const router = express.Router();
const LandingBlockController = require("../controllers/LandingBlockController");

// Route definitions
router.get("/", LandingBlockController.getAllLandingBlocks);
router.post("/", LandingBlockController.createLandingBlock);
router.put("/:id", LandingBlockController.updateLandingBlock);
router.delete("/:id", LandingBlockController.deleteLandingBlock);

// Route to serve the image
router.get("/:id/image", LandingBlockController.getLandingBlockImage);

//   routes for FAQ
router.post("/faqs", LandingBlockController.addFaq);
router.put("/faqs/:id", LandingBlockController.updateFaq);
router.delete("/faqs/:id", LandingBlockController.deleteFaq);
router.get("/faqs", LandingBlockController.getAllFaqs);
router.get("/AllLandingPageData", LandingBlockController.getAllLandingPageData);

module.exports = router;
