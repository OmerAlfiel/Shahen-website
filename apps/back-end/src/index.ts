import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";

import contactRoutes from "./modules/contact/contact.routes";
import quoteRoutes from "./modules/quote/quote.routes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { initializeDatabase, AppDataSource } from "./config/database";

dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);

// Security middleware
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				styleSrc: ["'self'", "'unsafe-inline'"],
				scriptSrc: ["'self'"],
				imgSrc: ["'self'", "data:", "https:"],
			},
		},
	})
);

// Rate limiting
const limiter = rateLimit({
	windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
	max: parseInt(process.env.RATE_LIMIT_MAX || "100"), // limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// Compression
app.use(compression());

// CORS
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(logger);

// Health check endpoint
app.get("/api/health", (_req, res) => {
	const health = {
		status: "OK",
		message: "Shahen Backend API is running",
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV,
		version: "1.0.0",
		database: AppDataSource.isInitialized ? "connected" : "disconnected",
	};

	res.status(200).json(health);
});

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/quote", quoteRoutes);

app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
	try {
		// Start the server first
		const server = app.listen(PORT, () => {
			console.log(`🚀 Server is running on port ${PORT}`);
			console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
			console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
		});

		// Try to initialize database (non-blocking)
		try {
			await initializeDatabase();
			console.log(`📊 Database: PostgreSQL connected`);
		} catch (dbError) {
			console.warn(
				"⚠️ Database connection failed, but server is running:",
				dbError
			);
			console.log("🔄 Database will retry connection on first API call");
		}
	} catch (error) {
		console.error("❌ Failed to start server:", error);
		process.exit(1);
	}
};

startServer();

export default app;
