import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['MONGO_URI'];

// check for missing environment variables
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
});

const ENV = {
  MONGO_URI: process.env.MONGO_URI!,
  PORT: process.env.PORT || 3000,
  ENVIRONMENT: process.env.NODE_ENV || 'development',
};

export default ENV;