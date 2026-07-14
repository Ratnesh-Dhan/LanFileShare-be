const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");

const file_path = path.join(__dirname, "../uploads");
const db_path = path.join(__dirname, "../db");

router.get("/files", async (req, res) => {
  try {
    const db = await fs.readdir(db_path);
    const jsonFiles = db.filter((element) => element.endsWith(".json"));

    const data = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await fs.readFile(path.join(db_path, file), "utf8");
        const json = JSON.parse(content);
        json.id = file;
        return json;
      }),
    );
    console.log(data);
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
