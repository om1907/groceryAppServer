import { logger } from "./logger.js";

export const handleUncaughtException = (server) => {
  process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
    logger.info("Shutting down due to uncaught exception");

    if (server) {
      server.close(() => {
        logger.info("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

export const handleUnhandledRejection = (server) => {
  process.on("unhandledRejection", (err) => {
    logger.error("Unhandled Rejection:", err);
    logger.info("Shutting down due to unhandled rejection");

    if (server) {
      server.close(() => {
        logger.info("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
