import bannerModel from "../Models/bannerModel.js";
import mongoose from "mongoose";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const ObjectId = mongoose.Types.ObjectId;
cloudinary.config({
  cloud_name: "dfrr6nmle",
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});



export const addBanner = async (req, res) => {
    try {
      let bannerData = {};
  
      if (req.files && req.files.bannerImage) {
        const uploadedImage = Array.isArray(req.files.bannerImage)
          ? req.files.bannerImage[0]
          : req.files.bannerImage;
        const modifiedName = `Banner-${Date.now()}${path.extname(
          uploadedImage.name
        )}`;
  
        const uploadResponse = await cloudinary.uploader.upload(
          uploadedImage.tempFilePath,
          {
            folder: "banner_images",
            public_id: modifiedName,
          }
        );
  
        bannerData = {
          fileId: uploadResponse.public_id,
          url: uploadResponse.secure_url,
        };
      }
  
      const newBanner = new bannerModel({
        bannerImage: bannerData,
      });
      await newBanner.save();
  
      res
        .status(201)
        .json({ message: "Category added successfully", newBanner: newBanner });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };


  export const getBanner = async (req, res) => {
    try {
      const banners = await bannerModel.find({});
      if (!banners) {
        return res.status(404).json({ message: "No Banners found" });
      }
      res.status(200).json(banners);
    } catch (error) {
      console.error("Error fetching banners:", error); // Log the error for debugging
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  
  
  
  
  // Delete banner
  export const deleteBanner = async (req, res) => {
    try {
      console.log("recieved banner id to delete", req.params.id)
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "Banner ID is required" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid banner ID format" });
      }
  
      const banner = await bannerModel.findById(id);
      if (!banner) {
        return res.status(404).json({ message: "Banner not found" });
      }
  
      await bannerModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };