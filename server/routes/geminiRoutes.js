const express = require("express");
const router = express.Router();
const { generate } = require("../scripts/gemini");

router.post("/generate-report", async (req, res) => {
  const {
    title,
    date,
    department,
    studentParticipants,
    facultyParticipants,
    mode,
    content,
    type,
  } = req.body;

  let promptText = `Generate a 6-line paragraph for an activity report with the following details:
    Activity: ${title}
    Date: ${date}
    Department: ${department}
    Number of Student Participants: ${studentParticipants}
    Number of Faculty Participants: ${facultyParticipants}
    Mode of Conduct: ${mode}
    Previous Content: ${content || "None"}
    
    Instructions:
    - Focus on activity details and outcomes
    - Keep it formal and professional
    - Avoid using [] or {} brackets
    ${type ? `- ${type}` : ""}`;

  const response = await generate(promptText);
  res.send(response);
});

router.post("/generate-feedback", async (req, res) => {
  const {
    title,
    date,
    department,
    studentParticipants,
    facultyParticipants,
    mode,
    content,
    type,
  } = req.body;

  let promptText = `Generate a 6-line paragraph for participant feedback with the following details:
    Activity: ${title}
    Date: ${date}
    Department: ${department}
    Number of Student Participants: ${studentParticipants}
    Number of Faculty Participants: ${facultyParticipants}
    Mode of Conduct: ${mode}
    Previous Feedback: ${content || "None"}
    
    Instructions:
    - Focus on participant experience and satisfaction
    - Include both positive aspects and areas for improvement
    - Avoid using [] or {} brackets
    ${type ? `- ${type}` : ""}`;

  const response = await generate(promptText);
  res.send(response);
});

router.post("/generate-outcome", async (req, res) => {
  const {
    title,
    date,
    department,
    studentParticipants,
    facultyParticipants,
    mode,
    content,
    type,
  } = req.body;

  let promptText = `Generate a 6-line paragraph for program outcomes with the following details:
    Activity: ${title}
    Date: ${date}
    Department: ${department}
    Number of Student Participants: ${studentParticipants}
    Number of Faculty Participants: ${facultyParticipants}
    Mode of Conduct: ${mode}
    Previous Outcomes: ${content || "None"}
    
    Instructions:
    - Focus on learning outcomes and skill development
    - Highlight specific achievements and benefits
    - Avoid using [] or {} brackets
    ${type ? `- ${type}` : ""}`;

  const response = await generate(promptText);
  res.send(response);
});

module.exports = router;
