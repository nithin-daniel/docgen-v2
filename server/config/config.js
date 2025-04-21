require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  // Add your database configuration here
  // Example for MongoDB:
  // mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/docgen',

  // Add other configuration as needed
  // jwtSecret: process.env.JWT_SECRET,
  // apiVersion: process.env.API_VERSION || 'v1',
};
