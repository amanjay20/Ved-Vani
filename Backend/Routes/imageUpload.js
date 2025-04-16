import pkg from 'express';
const { Request, Response } = pkg;

import express from 'express';
import path from "path";
import catchAsyncError from "../Middlewares/catchAsyncError.js";
import { v2 as cloudinary } from "cloudinary";
const router = express.Router();

cloudinary.config({
  cloud_name: "dfrr6nmle",
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});
const uploadImage = async (req, res) => {
  try {
    if (req.files && req.files.heroImage) {
      const heroImage = Array.isArray(req.files.heroImage)
        ? req.files.heroImage[0]
        : req.files.heroImage;
      const modifiedName = `ecommerce-${Date.now()}${path.extname(
        heroImage.name
      )}`;
      const heroImageUpload = await cloudinary.uploader.upload(
        heroImage.tempFilePath,
        {
          folder: "hero_images",
          public_id: modifiedName,
        }
      );
      res.status(201).json({
        sucess: true,
        fileId: heroImageUpload.public_id,
        url: heroImageUpload.secure_url,
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Error uploading image" });
  }
};
const deleteImage = catchAsyncError(async (req, res) => {
  const { fileId } = req.body;

  if (!fileId) {
    return res
      .status(400)
      .json({ success: false, message: "No file ID provided" });
  }

  // Delete image from Cloudinary
  const result = await cloudinary.uploader.destroy(fileId);

  res
    .status(200)
    .json({ success: true, message: "Image deleted successfully", result });
});
router.post("/upload-image", uploadImage);
router.delete("/delete-image", deleteImage);
export default router;
