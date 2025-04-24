const express = require("express");
const router = express.Router();
const { generate } = require("../scripts/gemini"); // Destructure the generate function

router.post("/generate-report", async (req, res) => {
  const activity_report = req.body;
  const response = await generate(
    "This is a iot workshop activity report, the answer should be in small paragraph with 6 lines"
  );
  res.send(response);
});

router.post("/generate-feedback", (req, res) => {
  const { feedback } = req.body;
  res.send("Hello from feedback");
});

router.post("/generate-outcome", (req, res) => {
  const { program_outcome } = req.body;
  res.send("Hello from program_outcome");
});

module.exports = router;
