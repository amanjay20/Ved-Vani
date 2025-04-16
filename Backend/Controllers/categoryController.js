import Category from "../Models/Category.js";
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





export const addCategory = async (req, res) => {
    try {
      const { categoryName } = req.body;
      if (!categoryName) {
        return res.status(400).json({ message: "Category name is required" });
      }
  
      let imageData = {};
  
      if (req.files && req.files.image) {
        const uploadedImage = Array.isArray(req.files.image)
          ? req.files.image[0]
          : req.files.image;
        const modifiedName = `category-${Date.now()}${path.extname(
          uploadedImage.name
        )}`;
  
        const uploadResponse = await cloudinary.uploader.upload(
          uploadedImage.tempFilePath,
          {
            folder: "category_images",
            public_id: modifiedName,
          }
        );
  
        imageData = {
          fileId: uploadResponse.public_id,
          url: uploadResponse.secure_url,
        };
      }
  
  
  
      
  
  
      
      const newCategory = new Category({
        categoryName,
        image: imageData,
      });
      console.log(newCategory, "newcategory");
      await newCategory.save();
  
      res
        .status(201)
        .json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };


  export const getCategories = async (req, res) => {
    try {
      const categories = await Category.find({});
      // console.log(categories, 'categories')
      if (!categories) {
        return res.status(404).json({ message: "No categories found" });
      }
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error); // Log the error for debugging
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };


  // Update Category
export const updateCategory = async (req, res) => {
    try {
      const { categoryName } = req.body;
      const categoryId = req.params.id;
      // console.log(categoryId)
      // Check if the category exists
      let category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      let imageData = category.image; // Keep the existing image if no new one is uploaded
  
      if (req.files && req.files.image) {
        const uploadedImage = Array.isArray(req.files.image)
          ? req.files.image[0]
          : req.files.image;
        const modifiedName = `category-${Date.now()}${path.extname(
          uploadedImage.name
        )}`;
  
        // Upload new image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(
          uploadedImage.tempFilePath,
          {
            folder: "category_images",
            public_id: modifiedName,
          }
        );
  
        imageData = {
          fileId: uploadResponse.public_id,
          url: uploadResponse.secure_url,
        };
      }
  
    //   let bannercategoryimageData = category.bannercategoryimage;
    //   if (req.files && req.files.bannercategoryimage) {
    //     const uploadedImage = Array.isArray(req.files.bannercategoryimage)
    //       ? req.files.bannercategoryimage[0]
    //       : req.files.bannercategoryimage;
    //     const modifiedName = `category-${Date.now()}${path.extname(
    //       uploadedImage.name
    //     )}`;
  
    //     const uploadResponse = await cloudinary.uploader.upload(
    //       uploadedImage.tempFilePath,
    //       {
    //         folder: "banner_category_images",
    //         public_id: modifiedName,
    //       }
    //     );
  
    //     bannercategoryimageData = {
    //       fileId: uploadResponse.public_id,
    //       url: uploadResponse.secure_url,
    //     };
    //   }
  
      // Update category fields
      category.categoryName = categoryName || category.categoryName;
      category.image = imageData;
    //   category.bannercategoryimage = bannercategoryimageData;
      await category.save();
  
      res
        .status(200)
        .json({ message: "Category updated successfully", category });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };



  // Delete Category
export const deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      // Check if the category exists
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      // Delete all products associated with this category
    //   await ProductSchema.deleteMany({ category: categoryId });
  
  
  
      // Delete category
      await Category.findByIdAndDelete(categoryId);
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };