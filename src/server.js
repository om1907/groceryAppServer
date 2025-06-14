import chalk from "chalk";
import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { handleUncaughtException, handleUnhandledRejection } from "./utils/errorHandler.js";

dotenv.config();

//Connect to the database
await connectDB();

const PORT = process.env.PORT || 3000;


const server = app.listen(PORT, () => {
  console.log(chalk.yellow(`Server is working on http://localhost:${process.env.PORT}`));
});

// Handling Uncaught Exception
handleUncaughtException(server);

// Unhandled Promise Rejection
handleUnhandledRejection(server);