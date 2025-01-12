import express from "express";
import { ENV, connectDB, logger } from "./config";
import { responseHandler } from "./middlewares";
import { authRoutes } from "./routes";

const app = express();

// middlewares
app.use(express.json());
app.use(responseHandler.successResponse);

// routes
const API_PREFIX = "/api/v1";
app.use(`${API_PREFIX}/auth`, authRoutes);

// error handling
app.use(responseHandler.errorResponse);

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
