import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/loanDB";

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.error("MongoDB connection failed ❌", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
