import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  parentCategory: { type: String },
}, { timestamps: true });

export default mongoose.model("Category", CategorySchema);
