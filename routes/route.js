const express = require("express");

const uploadRoute = require("./uploads");
const filesRoute = require("./files");
const downloadRoute = require("./download");
const deleteRoute = require("./delete");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is runing smoothly!");
});
router.use(uploadRoute);
router.use(filesRoute);
router.use(downloadRoute);
router.use(deleteRoute);

module.exports = router;
