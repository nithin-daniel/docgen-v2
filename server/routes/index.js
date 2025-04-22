const express = require("express");
const router = express.Router();

// Import route files
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const uploadRoutes = require("./uploadRoutes");
const { nanoid } = require("nanoid");
const AWS = require("aws-sdk");

// Use routes
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/upload-image", uploadRoutes);

// Root route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Docgen API" });
});

module.exports = router;
