const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/download/:filename", async (req, res) => {
  try {
    const { filename } = req.params;

    const filepath = path.join(
      __dirname,
      "../uploads",
      filename.replace(".json", ""),
    );
    console.log(filepath);
    if (!fs.existsSync(filepath)) {
      return (
        res.status(404),
        json({
          success: false,
          message: "File not found.",
        })
      );
    }
    return res.status(200).download(filepath);
  } catch (err) {
    console.error(err);

    return res.status(500);
  }
});

module.exports = router;
