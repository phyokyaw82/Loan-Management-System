import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import seedInterestRates from "./modules/interestRate/interestRate.seed.js.js";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/loanDB";

// MongoDB connection + seeding
mongoose
    .connect(MONGO_URI)
    .then(async () => {
        // Seed default interest rates (5,10,15,20)
        await seedInterestRates();
    })
    .catch(err => console.error("MongoDB connection failed", err));

// Start server
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT} 🚀`)
);
