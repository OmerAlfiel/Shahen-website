import "reflect-metadata";
import express from "express";
import cors, { CorsOptions } from "cors";
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
// Simplified and more reliable CORS setup
const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:5173",
	"http://localhost:3001", // Allow same origin
	"https://shahen-website.vercel.app", // Vercel frontend
	"https://shahen-website-production.up.railway.app", // Railway backend (for same-origin)
	// Add environment-specific origins if available
	...(process.env.CORS_ORIGINS
		? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
		: []),
	...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL.trim()] : []),
].filter(Boolean);

// Add Vercel preview deployments pattern
const vercelPattern = /^https:\/\/[a-z0-9-]+-.*\.vercel\.app$/i;

console.log("🌐 CORS allowed origins:", allowedOrigins);

const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		// Allow requests with no origin (mobile apps, curl, etc.)
		if (!origin) {
			console.log("CORS: ✅ Allowing request with no origin header");
			return callback(null, true);
		}

		// Check if origin is in allowed list
		if (allowedOrigins.includes(origin)) {
			console.log(`CORS: ✅ Allowed origin: ${origin}`);
			return callback(null, true);
		}

		// Check if origin matches Vercel pattern
		if (vercelPattern.test(origin)) {
			console.log(`CORS: ✅ Allowed Vercel origin: ${origin}`);
			return callback(null, true);
		}

		console.log(`CORS: ❌ Blocked origin: ${origin}`);
		return callback(new Error(`Origin ${origin} not allowed by CORS`));
	},
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"X-Requested-With",
		"Accept",
		"Origin",
	],
	exposedHeaders: ["Content-Length", "X-Total-Count"],
	maxAge: 86400, // 24 hours
	optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Log preflight requests for debugging
app.use((req, res, next) => {
	if (req.method === "OPTIONS") {
		console.log(
			`CORS Preflight: Origin=${req.headers.origin}, Method=${req.headers["access-control-request-method"]}, Headers=${req.headers["access-control-request-headers"]}`
		);
	}
	next();
});

// Debug endpoint to check CORS configuration
app.get("/api/debug/cors", (req, res): void => {
	if (process.env.NODE_ENV === "production" && !process.env.ENABLE_CORS_DEBUG) {
		res.status(403).json({ message: "CORS debug disabled in production" });
		return;
	}
	res.json({
		allowedOrigins,
		requestOrigin: req.headers.origin,
		nodeEnv: process.env.NODE_ENV,
		vercelPattern: vercelPattern.toString(),
	});
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Fallback CORS headers middleware (as backup)
app.use((req, res, next) => {
	const origin = req.headers.origin;
	const allowedOrigins = [
		"http://localhost:3000",
		"http://localhost:5173",
		"http://localhost:3001",
		"https://shahen-website.vercel.app", // Vercel frontend
		"https://shahen-website-production.up.railway.app", // Railway backend
	];

	// Check if origin is allowed or matches Vercel pattern
	if (
		!origin ||
		allowedOrigins.includes(origin) ||
		/^https:\/\/[a-z0-9-]+-.*\.vercel\.app$/i.test(origin)
	) {
		res.header("Access-Control-Allow-Origin", origin || "*");
		res.header("Access-Control-Allow-Credentials", "true");
		res.header(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS"
		);
		res.header(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization, X-Requested-With, Accept, Origin"
		);
		res.header(
			"Access-Control-Expose-Headers",
			"Content-Length, X-Total-Count"
		);
	}

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}

	next();
});

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
		const server = app.listen(PORT, "0.0.0.0", () => {
			console.log(`🚀 Server listening on 0.0.0.0:${PORT}`);
			console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
			console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
		});
		server.on("error", (err) => {
			console.error("❌ Server failed to bind to port:", err);
			process.exit(1);
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
