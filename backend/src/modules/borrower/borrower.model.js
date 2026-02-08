import mongoose from "mongoose";

const BorrowerSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        nrc: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const Borrower = mongoose.model("Borrower", BorrowerSchema);

export default Borrower;
