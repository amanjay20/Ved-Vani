import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    image: {
      fileId: String,
      url: String,
    },
  },
  { collection: 'categories' } // Explicitly mention the collection name
);

export default mongoose.model('Category', CategorySchema);
