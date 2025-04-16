import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    bannerImage: { fileId: String, url: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Banner", bannerSchema);
