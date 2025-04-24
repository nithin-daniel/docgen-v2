const express = require("express");
const router = express.Router();
const Doc = require("../models/Doc");
const User = require("../models/User"); // Add this require
// Get all documents by user_id
router.get("/documents/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const documents = await Doc.find({ user: user_id });

    if (!documents || documents.length === 0) {
      return res
        .status(404)
        .json({ message: "No documents found for this user" });
    }

    res.status(200).json({ documents: documents, count: documents.length });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field
    res.status(200).json({
      users: users,
      count: users.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all documents
router.get("/documents", async (req, res) => {
  try {
    const documents = await Doc.find().populate("user", "fullName email");
    res.status(200).json({
      documents: documents,
      count: documents.length,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete user and their documents
router.delete("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // Delete user's documents first
    await Doc.deleteMany({ user: user_id });

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(user_id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User and associated documents deleted successfully",
      deletedUser: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
