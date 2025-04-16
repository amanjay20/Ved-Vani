import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  title: { type: String, required: true },
  image: { fileId: String, url: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("SubCategory", subCategorySchema);
