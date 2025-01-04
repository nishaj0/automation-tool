import express from "express";
import { ENV, connectDB } from "./config";
import logger from "./config/logger";

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    logger.info("Starting server...");
    await connectDB();
    app.listen(ENV.PORT, () => {
      logger.info(`Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
  }
};

startServer();
