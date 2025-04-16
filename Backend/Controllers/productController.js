import ProductSchema from "../Models/product.js";
import Category from "../Models/Category.js";
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

export const createProducts = async (req, res) => {
  try {
    const {
      productName,
      description,
      brand,
      category,
      subcategoryId,
      productmrp,
      sizes,
      availableQuantity,
    } = req.body;

    // Find category and validate subcategory
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const subcategoryDoc = await SubCategory.findById(subcategoryId);
    if (!subcategoryDoc || !subcategoryDoc.categoryId.equals(categoryDoc._id)) {
      return res.status(400).json({ success: false, message: "Invalid subcategory for the selected category" });
    }

    // Prepare product object
    let productData = {
      productName,
      description,
      brand,
      category: categoryDoc._id,
      subcategoryId,
      productmrp,
      availableQuantity: JSON.parse(availableQuantity || '[]'),
      sizes: JSON.parse(sizes || '{}'),
      images: [],
    };

    // Handle file uploads
    if (req.files && req.files.images) {
      const imagesArray = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

      for (const image of imagesArray) {
        const imageUpload = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: "product_images",
          public_id: `product-${Date.now()}${path.extname(image.name)}`,
        });

        productData.images.push({
          fileId: imageUpload.public_id,
          url: imageUpload.secure_url,
        });
      }
    }

    // Save to DB
    const newProduct = await ProductSchema.create(productData);
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const getProducts = async (req, res) => {
    try {
      // Fetch all products and populate the category field to get category details
      const products = await ProductSchema.find().populate({
        path: "category", // Populating category reference
        select: "categoryName", // Selecting only categoryName field
      }).populate({
        path: "subcategoryId", // Populating category reference
        select: "title", // Selecting only categoryName field
      })
  // console.log(products)
      res.status(200).json({
        success: true,
        count: products.length,
        products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };