import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
import fs from "fs";
import { createServer } from "http";
import cron from "node-cron";

import { config, validateEnv } from "./config/env.js";
import { initializeSocket } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";

// Routes
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

// Validate environment variables
validateEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = config.port;

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || config.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Preflight request handling
app.options("*", cors());

// Create HTTP Server
const httpServer = createServer(app);

// Initialize Socket.IO
initializeSocket(httpServer);

// Middleware setup
app.use(express.json()); // to parse req.body
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB max file size
		},
	})
);

// Scheduled task: Clean temp files hourly
const setupCleanupTask = () => {
	const tempDir = path.join(process.cwd(), "tmp");
	cron.schedule("0 * * * *", () => {
		if (fs.existsSync(tempDir)) {
			fs.readdir(tempDir, (err, files) => {
				if (err) {
					console.log("Error reading temp directory:", err);
					return;
				}
				for (const file of files) {
					fs.unlink(path.join(tempDir, file), (err) => {
						if (err) console.log(`Error deleting temp file ${file}:`, err);
					});
				}
			});
		}
	});
};

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Serve frontend in production
if (config.nodeEnv === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
	});
}

// Error handler
app.use((err, req, res, next) => {
	res.status(500).json({ 
		message: config.nodeEnv === "production" 
			? "Internal server error" 
			: err.message 
	});
});

// Start server
const startServer = async () => {
	try {
		// Connect to database
		await connectDB();
		
		// Start cleanup task
		setupCleanupTask();
		
		// Start server
		httpServer.listen(PORT, () => {
			console.log(`🚀 Server is listening on http://localhost:${PORT} in ${config.nodeEnv} mode`);
		});
	} catch (error) {
		console.error("Server startup error:", error);
		process.exit(1);
	}
};

startServer();
