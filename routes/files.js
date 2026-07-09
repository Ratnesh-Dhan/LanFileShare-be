const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const folder_path = path.join(__dirname, "../uploads");
console.log(folder_path);
router.get("/files", async (req, res) => {
  try {
    const files = fs.readdirSync(folder_path);
    res.status(200).json({ files });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
