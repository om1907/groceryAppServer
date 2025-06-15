import chalk from "chalk";
import app from "./app.js";
import dotenv from "dotenv";
import { handleUncaughtException, handleUnhandledRejection } from "./utils/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 3098;

const server = app.listen(PORT, () => {
  console.log(chalk.yellow(`Server is working on:  http://localhost:${PORT}`));
});

// Handling Uncaught Exception
handleUncaughtException(server);

// Unhandled Promise Rejection
handleUnhandledRejection(server);