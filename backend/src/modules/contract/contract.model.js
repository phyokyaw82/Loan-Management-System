import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
    {
        loan: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
        documentUrl: { type: String, required: true }, // stored as URL for frontend
        signingDate: { type: Date, required: true },
    },
    { timestamps: true }
);

const Contract = mongoose.model("Contract", ContractSchema);
export default Contract;
