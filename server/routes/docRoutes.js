const express = require("express");
const Doc = require("../models/Doc");
const generateReportHtml = require("../utils/htmlGenerator");
const { uploadFile } = require("../config/r2"); // Add this import
const router = express.Router();

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
      user,
    } = req.body;

    let doc;
    // Create and save new document
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
      user: user,
    });
    doc = await newDoc.save();

    // Generate HTML and upload
    const html = await generateReportHtml(doc);
    const safeTitle = doc.activityTitle
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "")
      .toLowerCase();
    const fileName = `${safeTitle}-report.html`;
    const key = `reports/${Date.now()}-${fileName}`;

    await uploadFile(key, html, "text/html");
    const publicUrl = `https://${process.env.R2_PUBLIC_URL}/${key}`;

    // Update document with URL and HTML content
    doc.reportUrl = publicUrl;
    doc.htmlContent = html;
    await doc.save();

    res.status(201).json({
      document: doc,
      reportUrl: publicUrl,
      html: html,
    });
  } catch (error) {
    console.error("Document creation error:", error);
    res.status(400).json({
      message: error.message,
      details: error.errors,
    });
  }
});

// router.get("/get-doc", async (req, res) => {
//   try {
//     const data = await Doc.findById("680a1dd2da771e2a36ac1b47");
//     res.json({
//       data: data,
//     });
//   } catch (error) {
//     console.error("Error fetching document:", error);
//     res.status(500).json({
//       message: "Error fetching document",
//       details: error.message,
//     });
//   }
// });

module.exports = router;
