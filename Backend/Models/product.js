import mongoose from "mongoose";

const { Schema, model } = mongoose;

const imageSchema = new Schema({
  fileId: { type: String, required: true },
  url: { type: String, required: true },
});

const sizeSchema = new mongoose.Schema({
  regular: Number,
  medium: Number,
  ultra: Number,
});

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    description: { type: String },
    brand: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    productmrp: { type: Number, required: true },

    availableQuantity: [{ type: Number }],
    faqs: [{ type: mongoose.Schema.Types.ObjectId, ref: "FaqSchema" }],
    images: [imageSchema],
    sizes: sizeSchema,

    reviews: [reviewSchema], // Add reviews array
  },
  { timestamps: true }
);

const ProductSchema = model("ProductSchema", productSchema);
export default ProductSchema;
