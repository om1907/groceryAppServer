import mongoose from "mongoose";
import chalk from "chalk";

export const connectDB = async () => { 
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.yellow("MongoDB connected successfully"));
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process with failure
  }
}