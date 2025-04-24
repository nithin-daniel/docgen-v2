const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  activityTitle: {
    type: String,
    required: true,
  },
  activityDate: {
    type: Date,
    required: true,
  },
  departmentOrClub: {
    type: String,
    required: true,
  },
  studentParticipants: {
    type: Number,
    required: true,
  },
  facultyParticipants: {
    type: Number,
    required: true,
  },
  eventMode: {
    type: String,
    required: true,
    enum: ["online", "offline", "hybrid"],
  },
  activityReport: {
    type: String,
    required: true,
  },
  feedbackReceived: {
    type: String,
    required: true,
  },
  programmeOutcome: {
    type: String,
    required: true,
  },
  brochureImages: [
    {
      type: String,
      required: true,
    },
  ],
  eventPhotographs: [
    {
      type: String,
      required: true,
    },
  ],
  participantsList: [
    {
      type: String,
      required: true,
    },
  ],
  certificates: [
    {
      type: String,
      required: false,
    },
  ],
  html_link: {
    type: String,
    required: false,
  },
  reportUrl: {
    type: String,
  },
  htmlContent: {
    type: String,
  },
});

module.exports = mongoose.model("Doc", docSchema);
