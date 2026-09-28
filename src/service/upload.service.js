import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import {r2Client} from "../config/r2.config.js";

export const uploadFileToR2 = async (file, folder = "uploads") => {
  const extension = path.extname(file.originalname);
  const key = `${folder}/${uuidv4()}${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME, 
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await r2Client.send(command);

  const baseUrl = process.env.R2_BUCKET_URL.replace(/\/$/, "");
  const publicUrl = `${baseUrl}/${key}`;

  return {
    url: publicUrl,
    key: key,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  };
};

export const handleUploadImage = async (file) => {
  const result = await uploadFileToR2(file, "images");
  return result;
};

export const handleUploadDocuments = async (files) => {
  const uploadPromises = files.map((file) => uploadFileToR2(file, "documents")); // duyệt qua từng file trong mảng files và upload lên
  const results = await Promise.all(uploadPromises); //điều kiện Promise.all để chờ tất cả các upload hoàn thành trước khi trả về kết quả
  return results;
};