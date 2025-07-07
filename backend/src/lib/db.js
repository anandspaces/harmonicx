import mongoose from "mongoose";
import { config } from "../config/env.js";

/**
 * Connect to MongoDB database
 * @returns {Promise<mongoose.Connection>} The database connection
 */
export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(config.mongodbUri);
		console.log(`Connected to MongoDB ${conn.connection.host}`);
		return conn;
	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
		process.exit(1); // 1 is failure, 0 is success
	}
};
