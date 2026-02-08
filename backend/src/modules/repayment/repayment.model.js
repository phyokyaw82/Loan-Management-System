import mongoose from "mongoose";

const RepaymentSchema = new mongoose.Schema(
    {
        loan: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
        paymentDate: { type: Date, required: true },
        amountPaid: { type: Number, required: true },
        paymentTerm: { type: Number, required: true }, // in months
        description: { type: String },
        remainingBalance: { type: Number }, // optional, can be computed dynamically
    },
    { timestamps: true }
);

const Repayment = mongoose.model("Repayment", RepaymentSchema);
export default Repayment;
