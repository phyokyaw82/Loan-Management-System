import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: "Borrower", required: true },
    amount: { type: Number, required: true },          // principal
    type: { type: String, enum: ["Personal", "Mortgage"], required: true },
    interestRate: { type: Number, required: true },    // %
    startDate: Date,
    endDate: Date,
});

export default mongoose.model("Loan", loanSchema);
