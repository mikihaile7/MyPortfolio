const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI ||
    "mongodb+srv://mhaile2_db_user:Password12345@cluster0.ndwv30a.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0"
};

export default config;