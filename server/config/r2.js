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

const generatePresignedUrl = async (
  key,
  operation = "put",
  fileType = "application/octet-stream"
) => {
  try {
    // console.log("Generating presigned URL with params:", {
    //   bucket: process.env.R2_BUCKET_NAME,
    //   key,
    //   operation,
    //   fileType,
    // });

    const params = {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
      ACL: "public-read",
      Expires: 3600,
    };

    const url =
      operation === "put"
        ? r2Client.getSignedUrl("putObject", params)
        : r2Client.getSignedUrl("getObject", params);

    console.log("Successfully generated presigned URL for:", key);
    return url;
  } catch (error) {
    console.error("Detailed error information:", {
      name: error.name,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      requestId: error.requestId,
      cfId: error.cfId,
      stack: error.stack,
    });

    console.log("Configuration check:", {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
      bucketName: process.env.R2_BUCKET_NAME,
      hasAccessKey: !!process.env.R2_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.R2_SECRET_ACCESS_KEY,
    });

    throw error;
  }
};

const uploadFile = async (file, key) => {
  try {
    const fileType = file.mimetype || "application/octet-stream";
    const params = {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: fileType,
      ACL: "public-read",
    };

    const response = await r2Client.upload(params).promise();
    console.log("File uploaded successfully:", response);
    return `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${key}`;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

module.exports = {
  r2Client,
  generatePresignedUrl,
  uploadFile,
};
