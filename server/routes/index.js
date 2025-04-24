const express = require("express");
const router = express.Router();

// Import route files
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const uploadRoutes = require("./uploadRoutes");
const geminiRoutes = require("./geminiRoutes");
const docRoutes = require("./docRoutes");
const adminRoutes = require("./adminRoutes");

// Use routes
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/upload-image", uploadRoutes);
router.use("/gemini", geminiRoutes);
router.use("/doc", docRoutes);
router.use("/admin", adminRoutes);

// Root route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Docgen API" });
});

module.exports = router;
