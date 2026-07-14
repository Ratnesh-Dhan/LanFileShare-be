const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/uploads", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }
    console.log(req.body);

    // Writing our raw DB on JSON files.
    date = String(new Date());
    const fileData = {
      name: req.body.name,
      // uploadAt: date.split(" GMT")[0].trim(),
      uploadedAt: new Date().toISOString(),
      ip: req.ip,
      size: req.body.size,
      type: req.file.mimetype,
    };
    const jsonString = JSON.stringify(fileData, null, 2);
    fs.writeFile(
      `./db/${req.file.filename}.json`,
      jsonString,
      "utf8",
      (err) => {
        if (err) {
          console.error("An error occurred while writing the file:", err);
          return;
        }
        console.log("JSON DB created successfully.!");
      },
    );
    // Writing our raw DB on JSON files.

    res.json({
      success: true,
      message: "File uploaded successfully.",
      file: {
        filename: req.file.filename,
        originalName: req.body.name,
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
