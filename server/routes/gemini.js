const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { activity_report, feedback, program_outcome } = req.body;
  res.send("Hello from gemini.js");
});

module.exports = router;
