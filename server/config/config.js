import "dotenv/config";

// Secrets come from environment variables (.env locally, Vercel dashboard in production).
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "dev_only_change_me",
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/Portfolio",
};

export default config;
