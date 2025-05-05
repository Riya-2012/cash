import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  period: { type: String, required: true }, // e.g., "monthly", "quarterly"
  startDate: { type: Date, required: true },
  recurring: { type: Boolean, default: false },
  notifications: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;
