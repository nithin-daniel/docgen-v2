const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /api/auth/signup
router.post("/signup", authController.signup);

// POST /api/auth/login
router.post("/login", authController.login);

router.post("/register-super-admin", authController.registerSuperAdmin);

module.exports = router;
