import mongoose from "mongoose";

const interestRateSchema = new mongoose.Schema({
  rate: { type: Number, required: true }, // e.g., 5, 10, 15, 20
}, { timestamps: true });

export default mongoose.model("InterestRate", interestRateSchema);
