import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./modules/contact/contact.routes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { initializeDatabase } from "./config/database";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(logger);

// Health check endpoint
app.get("/api/health", (_req, res) => {
	res.status(200).json({
		status: "OK",
		message: "Shahen Backend API is running",
		timestamp: new Date().toISOString(),
		database: "Connected",
	});
});

// API Routes
app.use("/api/contact", contactRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
	try {
		// Initialize database connection
		await initializeDatabase();

		// Start server
		app.listen(PORT, () => {
			console.log(`🚀 Server is running on port ${PORT}`);
			console.log(
				`🌐 API Documentation available at http://localhost:${PORT}/api/health`
			);
			console.log(
				`🔗 Frontend URL: ${
					process.env.FRONTEND_URL || "http://localhost:3000"
				}`
			);
		});

		// Try to initialize database connection (non-blocking)
		try {
			await initializeDatabase();
			console.log(`📊 Database: PostgreSQL connected`);
		} catch (dbError) {
			console.warn(
				`⚠️  Database connection failed: ${
					dbError instanceof Error ? dbError.message : String(dbError)
				}`
			);
			console.warn(
				`📝 Server running without database. Please configure PostgreSQL to enable contact form.`
			);
		}
	} catch (error) {
		console.error("❌ Failed to start server:", error);
		process.exit(1);
	}
};

startServer();

export default app;
