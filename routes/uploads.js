const express = require("express");
const router = express.Router();
const path = require("path");

router.post("/uploads", async (req, res) => {
  try {
    console.log(req);
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      file: {
        filename: req.file.filename,
        originalName: req.file.originalName,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Upload failed.",
    });
  }
});

module.exports = router;
