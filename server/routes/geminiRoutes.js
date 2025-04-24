const express = require("express");
const router = express.Router();
const { generate, reGenerate } = require("../scripts/gemini"); // Destructure the generate function

router.post("/generate-report", async (req, res) => {
  const {
    title,
    date,
    department,
    studentParticipants,
    facultyParticipants,
    mode,
  } = req.body;

  const prompt = `Generate a 6-line paragraph for an activity report with the following details:
    Activity: ${title}
    Date: ${date}
    Department: ${department}
    Number of Student Participants: ${studentParticipants}
    Number of Faculty Participants: ${facultyParticipants}
    Mode of Conduct: ${mode}, this response is going direct to client side so don't add any [] or {} brackets.`;
  const response = await generate(prompt);
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
