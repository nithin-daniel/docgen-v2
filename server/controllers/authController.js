const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const authController = {
  // Signup
  signup: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists with this email" });
      }

      // Create new user
      const user = new User({
        fullName,
        email,
        password,
      });

      await user.save();

      // Generate token
      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token
      const token = generateToken(user._id);

      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Super Admin Registration
  registerSuperAdmin: async (req, res) => {
    try {
      const { fullName, email, password, superAdminKey } = req.body;

      // Verify super admin registration key
      if (superAdminKey !== process.env.SUPER_ADMIN_KEY) {
        return res.status(403).json({ message: "Invalid super admin key" });
      }

      // Check if super admin already exists
      const existingSuperAdmin = await User.findOne({ role: "superadmin" });
      if (existingSuperAdmin) {
        return res.status(400).json({ message: "Super admin already exists" });
      }

      // Check if email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Create super admin user
      const superAdmin = new User({
        fullName,
        email,
        password,
        role: "superadmin",
      });

      await superAdmin.save();

      // Generate token
      const token = generateToken(superAdmin._id);

      res.status(201).json({
        success: true,
        token,
        user: {
          id: superAdmin._id,
          fullName: superAdmin.fullName,
          email: superAdmin.email,
          role: superAdmin.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
