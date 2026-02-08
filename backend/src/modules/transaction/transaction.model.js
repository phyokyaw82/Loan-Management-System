import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        loan: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
        type: { type: String, enum: ["Repayment", "Late Fee", "Penalty"], required: true },
        amount: { type: Number, required: true },
        description: { type: String },
        remainingBalance: { type: Number }, // optional, can be computed dynamically
        transactionDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
