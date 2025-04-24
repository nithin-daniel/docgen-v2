const express = require("express");
const Doc = require("../models/Doc");

const router = express.Router();

// POST route to create a new document
router.post("/create", async (req, res) => {
  try {
    const {
      title,
      date,
      department,
      studentCount,
      facultyCount,
      mode,
      report,
      feedback,
      outcome,
      brochure = [],
      photos = [],
      participants = [],
      certificates = [],
    } = req.body;

    const newDoc = new Doc({
      activityTitle: title,
      activityDate: date,
      departmentOrClub: department,
      studentParticipants: studentCount,
      facultyParticipants: facultyCount,
      eventMode: mode,
      activityReport: report,
      feedbackReceived: feedback,
      programmeOutcome: outcome,
      brochureImages: brochure,
      eventPhotographs: photos,
      participantsList: participants,
      certificates,
    });

    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);
  } catch (error) {
    console.error("Document creation error:", error);
    res.status(400).json({
      message: error.message,
      details: error.errors,
    });
  }
});

module.exports = router;
