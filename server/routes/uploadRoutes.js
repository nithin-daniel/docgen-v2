const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const { r2Client, generatePresignedUrl, uploadFile } = require("../config/r2");
const auth = require("../middleware/auth");

// Generate presigned URL for uploading a file
router.post("/presigned-url", auth, async (req, res) => {
  try {
    const { fileName, operation = "put" } = req.body;

    if (!fileName) {
      return res.status(400).json({ error: "File name is required" });
    }

    // Get file extension to determine content type
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const contentType = getContentType(fileExtension);

    // Generate a unique key for the file
    const key = `FormAssets/${Date.now()}-${fileName}`;
    const url = await generatePresignedUrl(key, operation);

    res.json({
      url,
      key,
      contentType,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
});

// Helper function to determine content type
function getContentType(extension) {
  const contentTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };

  return contentTypes[extension] || "application/octet-stream";
}

// Update the listObjects function
const listObjects = async (prefix = "") => {
  try {
    const params = {
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: prefix,
    };

    const data = await r2Client.listObjectsV2(params).promise();
    return data.Contents || [];
  } catch (error) {
    console.error("Error listing objects:", error);
    throw error;
  }
};

module.exports = router;
