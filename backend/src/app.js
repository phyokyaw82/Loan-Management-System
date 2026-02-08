import express from "express";
import cors from "cors";

import borrowerRoutes from "./routes/borrower.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import repaymentRoutes from "./routes/repayment.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import contractRoutes from "./routes/contract.routes.js";
import interestRateRoutes from "./routes/interestRate.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/borrowers", borrowerRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/repayments", repaymentRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/interestrates", interestRateRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "OK" }));

export default app;
