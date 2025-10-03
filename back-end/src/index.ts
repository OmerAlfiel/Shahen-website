import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./modules/contact/contact.routes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";

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
	});
});

// API Routes
app.use("/api/contact", contactRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT}`);
	console.log(
		`📝 API Documentation available at http://localhost:${PORT}/api/health`
	);
});

export default app;
