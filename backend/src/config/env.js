import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * Environment variables configuration
 */
export const config = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  
  // Database configuration
  mongodbUri: process.env.MONGODB_URI,
  
  // Auth configuration
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  adminEmail: process.env.ADMIN_EMAIL,
  
  // Google OAuth configuration
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  },
  
  // Frontend configuration
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  
  // CORS configuration
  allowedOrigins: [
    "http://localhost:3000", 
    "https://harmonicx.vercel.app"
  ],
};

/**
 * Validate required environment variables
 */
export const validateEnv = () => {
  const requiredVars = ["MONGODB_URI"];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }
  
  return true;
}; 