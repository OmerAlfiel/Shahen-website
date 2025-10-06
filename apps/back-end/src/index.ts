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

// Validate PORT
if (isNaN(PORT) || PORT < 1 || PORT > 65535) {
	console.error(
		`❌ Invalid PORT: ${process.env.PORT}. Must be an integer between 1 and 65535`
	);
	process.exit(1);
}

console.log(`🔧 Starting with PORT: ${PORT} (type: ${typeof PORT})`);
console.log(`🔧 Environment variables check:`);
console.log(`   - NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   - PORT: ${process.env.PORT}`);
console.log(`   - DB_HOST: ${process.env.DB_HOST ? "SET" : "NOT SET"}`);
console.log(
	`   - DATABASE_URL: ${process.env.DATABASE_URL ? "SET" : "NOT SET"}`
);

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

// ---------- CORS Configuration ----------
// Allow multiple origins via CORS_ORIGINS (comma separated) or fallback to FRONTEND_URL
// Defaults include localhost and the known production domain.
const defaultOrigins = [
	"http://localhost:3000",
	"http://localhost:5173",
	"https://shahen-website.vercel.app",
];
const envOrigins = (process.env.CORS_ORIGINS || "")
	.split(",")
	.map((o) => o.trim())
	.filter(Boolean);

const staticAllowedOrigins = Array.from(
	new Set(
		[
			...(envOrigins.length ? envOrigins : []),
			process.env.FRONTEND_URL || "",
			...defaultOrigins,
		].filter(Boolean)
	)
);

// Optional regex patterns (e.g., all vercel preview deployments)
const originPatterns: RegExp[] = [/^https?:\/\/[a-z0-9-]+-.*\.vercel\.app$/i];

console.log("🌐 CORS allowed origins:", staticAllowedOrigins);

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin) {
				// Non-browser or same-origin requests
				return callback(null, true);
			}

			if (
				staticAllowedOrigins.includes(origin) ||
				originPatterns.some((r) => r.test(origin))
			) {
				return callback(null, true);
			}

			console.warn(`🚫 CORS blocked request from origin: ${origin}`);
			return callback(new Error("Not allowed by CORS"));
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"Accept",
			"Origin",
			"X-Requested-With",
		],
		exposedHeaders: ["Content-Length"],
		maxAge: 600, // cache preflight for 10 minutes
		optionsSuccessStatus: 204,
	})
);
// Explicitly handle OPTIONS in case some proxies strip automatic handling
app.options("*", cors());

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
		port: PORT,
		env_check: {
			has_db_host: !!process.env.DB_HOST,
			has_db_password: !!process.env.DB_PASSWORD,
			has_database_url: !!process.env.DATABASE_URL,
		},
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
		// Start the server first - bind to 0.0.0.0 for Railway
		const server = app.listen(PORT, "0.0.0.0", () => {
			console.log(`🚀 Server is running on port ${PORT}`);
			console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
			console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
			console.log(`🔧 Server bound to 0.0.0.0:${PORT}`);
		});
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
