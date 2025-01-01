import { createLogger, format, transports } from "winston";

const logger = createLogger({
	level: "info",
	format: format.combine(
		// format.colorize({ all: true }),
		format.timestamp(),
		format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`),
	),
	transports: [
		new transports.Console(),
		new transports.File({ filename: "logs/error.log", level: "error" }),
		new transports.File({ filename: "logs/combined.log" }),
	],
});

export default logger;