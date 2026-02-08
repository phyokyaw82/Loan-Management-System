// resetDatabase.js
import mongoose from "mongoose";
import Borrower from "./models/borrower.model.js";
import Loan from "./models/loan.model.js";
import Transaction from "./models/transaction.model.js";
import Repayment from "./models/repayment.model.js";

async function resetDatabase() {
    try {

        const PORT = process.env.PORT || 5000;
        const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/loanDB";


        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Delete all documents
        await Promise.all([
            Borrower.deleteMany({}),
            Loan.deleteMany({}),
            Transaction.deleteMany({}),
            Repayment.deleteMany({})
        ]);

        console.log("All collections cleared!");

        // Optional: seed a test loan
        /*
        const borrower = await Borrower.create({ fullName: "Test User" });
        const loan = await Loan.create({
            borrower: borrower._id,
            amount: 3000,
            type: "Personal",
            startDate: new Date(),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            interestRate: 10
        });
        console.log("Seeded loan:", loan);
        */

        console.log("Database reset completed.");
        mongoose.disconnect();
    } catch (err) {
        console.error("Error resetting database:", err);
        mongoose.disconnect();
    }
}

resetDatabase();
