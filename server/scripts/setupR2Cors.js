require("dotenv").config();
const AWS = require("aws-sdk");

const r2Client = new AWS.S3({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  maxRetries: 3,
});

const corsConfig = {
  CORSRules: [
    {
      AllowedHeaders: ["*"],
      AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      AllowedOrigins: ["*"],
      ExposeHeaders: ["ETag"],
      MaxAgeSeconds: 3000,
    },
  ],
};

async function setupCors() {
  try {
    await r2Client
      .putBucketCors({
        Bucket: process.env.R2_BUCKET_NAME,
        CORSConfiguration: corsConfig,
      })
      .promise();
    console.log("CORS configuration updated successfully");
  } catch (error) {
    console.error("Error setting up CORS:", error);
    throw error;
  }
}

// Run the setup
setupCors();
