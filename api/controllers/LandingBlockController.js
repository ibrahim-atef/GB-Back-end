/**
 * @author : Ibrahim Atef
 * @description : This file contains the LandingBlock controllers
 * @date : 01/09/2024
 *
 */
/*
To send an image file directly from your device, you'll need to implement file upload functionality in your backend.
 This typically involves handling multipart form data,
  where you send both the image file and the other data (such as title, desc, etc.) together in a single request.

----npm install multer
*/
const LandingBlock = require("../models/LandingBlock");
const Faq = require("../models/Faq");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

 
const uploadDir = path.join(__dirname, '../uploads');

 
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

 
const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single('img');

// Create a new landing block with an uploaded image
const createLandingBlock = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ Error: "Error on uploading: " + err.message });
    }

    const { title, desc } = req.body;

    try {
      const landingBlock = new LandingBlock({
        img: req.file ? req.file.buffer : null, 
        title,
        desc,
        contentType: req.file ? req.file.mimetype : null  
      });

      const savedLandingBlock = await landingBlock.save();
      res.status(200).json({
        _id: savedLandingBlock._id,
        title: savedLandingBlock.title,
        desc: savedLandingBlock.desc,
        imgUrl: `/api/landingblocks/${savedLandingBlock._id}/image`  
      });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  });
};

 
const getAllLandingBlocks = async (req, res) => {
  try {
    const landingBlocks = await LandingBlock.find({});
    res.status(200).json(landingBlocks.map(block => ({
      _id: block._id,
      title: block.title,
      desc: block.desc,
      imgUrl: `/landingblocks/${block._id}/image` // Return a URL to access the image
    })));
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

 
const updateLandingBlock = async (req, res) => {
  const { id } = req.params;
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ Error: "Error on uploading: " + err.message });
    }

    const { title, desc } = req.body;
    const img = req.file ? req.file.buffer : req.body.img; // Update the image if a new one is provided

    try {
      const landingBlock = await LandingBlock.findById(id);

      if (!landingBlock) {
        return res.status(404).json({ Error: "LandingBlock not found" });
      }

      landingBlock.img = img;
      landingBlock.title = title;
      landingBlock.desc = desc;
      landingBlock.contentType = req.file ? req.file.mimetype : landingBlock.contentType;

      const updatedLandingBlock = await landingBlock.save();
      res.status(200).json(updatedLandingBlock);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  });
};

 
const deleteLandingBlock = async (req, res) => {
  const { id } = req.params;
  try {
    const landingBlock = await LandingBlock.findById(id);

    if (!landingBlock) {
      return res.status(404).json({ Error: "LandingBlock not found" });
    }

    await landingBlock.remove();
    res.status(200).json("LandingBlock has been deleted...");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

 
const getLandingBlockImage = async (req, res) => {
  const { id } = req.params;
  try {
    const landingBlock = await LandingBlock.findById(id);

    if (!landingBlock || !landingBlock.img) {
      return res.status(404).json({ Error: "Image not found" });
    }

    res.set("Content-Type", landingBlock.contentType);  
    res.send(landingBlock.img);  
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};
// faq logic 
const addFaq = async (req, res) => {
    const { question, answer } = req.body;
    try {
      const faq = new Faq({ question, answer });
      const savedFaq = await faq.save();
      res.status(200).json(savedFaq);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  };
  
  const updateFaq = async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
      const faq = await Faq.findById(id);
      if (!faq) {
        return res.status(404).json({ Error: "FAQ not found" });
      }
      faq.question = question;
      faq.answer = answer;
      const updatedFaq = await faq.save();
      res.status(200).json(updatedFaq);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  };
  
  const deleteFaq = async (req, res) => {
    const { id } = req.params;
    try {
      const faq = await Faq.findById(id);
      if (!faq) {
        return res.status(404).json({ Error: "FAQ not found" });
      }
      await faq.remove();
      res.status(200).json("FAQ has been deleted...");
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  };
  
  const getAllFaqs = async (req, res) => {
    try {
      const faqs = await Faq.find({});
      res.status(200).json(faqs);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  };



// Get All Landing page data (Landing Blocks and FAQs)
const getAllLandingPageData = async (req, res) => {
    try {
      // Execute both queries in parallel
      const [landingBlocks, faqs] = await Promise.all([
        LandingBlock.find({}),
        Faq.find({})
      ]);
  
  
      const mappedLandingBlocks = landingBlocks.map(block => ({
        _id: block._id,
        title: block.title,
        desc: block.desc,
        imgUrl: `/landingBlocks/${block._id}/image` // URL to access the image
      }));
  
       
      res.status(200).json({
        landingBlocks: mappedLandingBlocks,
        faqs: faqs
      });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  };
  

module.exports = {
  createLandingBlock,
  getAllLandingBlocks,
  updateLandingBlock,
  deleteLandingBlock,
  getLandingBlockImage,
  addFaq,
  updateFaq,
  deleteFaq,
  getAllFaqs,
  getAllLandingPageData
};
