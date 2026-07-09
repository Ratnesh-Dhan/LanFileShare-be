const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.delete("/delete/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../uploads", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }
    fs.unlinkSync(filePath);
    return res.status(200).json({
      success: true,
      message: "File deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});

module.exports = router;
