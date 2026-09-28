import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();
console.log("ENDPOINT:", process.env.ENDPOINT_URL);
console.log("BUCKET:", process.env.BUCKET_NAME);
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

