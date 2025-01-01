import mongoose from "mongoose";
import { ENV } from "./";
import logger from "./logger";

const connectDB = async () => {
	try {
		await mongoose.connect(ENV.MONGO_URI);
		logger.info("Connected to MongoDB");
	} catch (error) {
		logger.error("Failed to connect to MongoDB", error);
		process.exit(1);
	}
};

export default connectDB;
