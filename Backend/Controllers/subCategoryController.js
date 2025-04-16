import SubCategory from "../Models/SubCategory.js";
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


export const addSubCategory = async (req, res) => {
    try {
      const { categoryId, title } = req.body;
  
      if (!categoryId || !title || !req.files || !req.files.image) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const uploadedImage = req.files.image;
      const modifiedName = `subcategory-${Date.now()}${path.extname(uploadedImage.name)}`;
  
      const uploadResponse = await cloudinary.uploader.upload(
        uploadedImage.tempFilePath,
        {
          folder: "subcategory_images",
          public_id: modifiedName,
        }
      );
  
      const imageData = {
        fileId: uploadResponse.public_id,
        url: uploadResponse.secure_url,
      };
  
      const newSubCategory = new SubCategory({
        categoryId,
        title,
        image: imageData,
      });
  
      await newSubCategory.save();
  
      res.status(201).json({ message: "Subcategory added successfully", subCategory: newSubCategory });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };


  export const allSubCategory = async(req,res)=>{
    try {
        const subcategories = await SubCategory.find().populate("categoryId", "categoryName"); // only populate categoryName
        res.status(200).json(subcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
  }