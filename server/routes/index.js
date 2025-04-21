const express = require("express");
const router = express.Router();

// Import route files
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

// Use routes
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

// Root route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Docgen API" });
});

module.exports = router;
