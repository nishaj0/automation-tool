import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGO_URI", "ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET", "CLIENT_URL"];

// check for missing environment variables
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
}

const ENV = {
  MONGO_URI: process.env.MONGO_URI as string,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
  CLIENT_URL: process.env.CLIENT_URL as string,
  PORT: process.env.PORT || 3000,
  ENVIRONMENT: process.env.NODE_ENV || "DEV",
};

export default ENV;
