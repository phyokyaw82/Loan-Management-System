import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected ✅"); // Make sure you see this in terminal
    } catch (err) {
        console.error("MongoDB connection failed ❌", err);
        process.exit(1);
    }
};

export default connectDB;
