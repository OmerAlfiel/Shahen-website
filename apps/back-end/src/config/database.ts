import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Contact } from "../entities/Contact";

dotenv.config();

/**
 * Resolve database connection parameters with the following precedence:
 * 1. Explicit DB_* env vars (DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME) if set and not placeholder (e.g. "$PGHOST")
 * 2. PG* env vars provided by hosting platforms (PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE)
 * 3. Parsed DATABASE_URL if present (postgres://user:pass@host:port/db)
 * 4. Local sensible defaults
 */
interface ResolvedDbConfig {
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
}

const isPlaceholder = (val?: string) => !!val && /^\$[A-Z_]+$/.test(val);

function parseDatabaseUrl(url?: string): Partial<ResolvedDbConfig> {
	if (!url) return {};
	try {
		const u = new URL(url);
		return {
			host: u.hostname,
			port: u.port ? parseInt(u.port, 10) : undefined,
			username: decodeURIComponent(u.username),
			password: decodeURIComponent(u.password),
			database: u.pathname.replace(/^\//, ""),
		} as Partial<ResolvedDbConfig>;
	} catch {
		return {};
	}
}

function resolveDbConfig(): ResolvedDbConfig {
	const fromUrl = parseDatabaseUrl(process.env.DATABASE_URL);

	const host =
		(!isPlaceholder(process.env.DB_HOST) && process.env.DB_HOST) ||
		fromUrl.host ||
		process.env.PGHOST ||
		"localhost";
	const port =
		(!isPlaceholder(process.env.DB_PORT) &&
			parseInt(process.env.DB_PORT || "", 10)) ||
		fromUrl.port ||
		(process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432);
	const username =
		(!isPlaceholder(process.env.DB_USERNAME) && process.env.DB_USERNAME) ||
		fromUrl.username ||
		process.env.PGUSER ||
		"postgres";
	const password =
		(!isPlaceholder(process.env.DB_PASSWORD) && process.env.DB_PASSWORD) ||
		fromUrl.password ||
		process.env.PGPASSWORD ||
		"postgres";
	const database =
		(!isPlaceholder(process.env.DB_NAME) && process.env.DB_NAME) ||
		fromUrl.database ||
		process.env.PGDATABASE ||
		"shahen_logistics";

	return { host, port, username, password, database };
}

const resolved = resolveDbConfig();

// One‑time diagnostic (avoid leaking secrets)
console.log("🔎 DB Config Resolution:");
console.log(`   host: ${resolved.host}`);
console.log(`   port: ${resolved.port}`);
console.log(`   user: ${resolved.username}`);
console.log(`   db:   ${resolved.database}`);
if (isPlaceholder(process.env.DB_HOST)) {
	console.warn(
		`⚠️ DB_HOST was a placeholder (${process.env.DB_HOST}); substituted with '${resolved.host}'. Update your Railway environment vars to use actual values (no $ prefix).`
	);
}

export const AppDataSource = new DataSource({
	type: "postgres",
	host: resolved.host,
	port: resolved.port,
	username: resolved.username,
	password: resolved.password,
	database: resolved.database,
	synchronize: process.env.NODE_ENV === "development",
	logging: process.env.NODE_ENV === "development",
	entities: [Contact],
	migrations:
		process.env.NODE_ENV === "development"
			? ["src/migrations/*.ts"]
			: ["dist/migrations/*.js"],
	ssl:
		process.env.NODE_ENV === "production"
			? { rejectUnauthorized: false }
			: false,
	extra: {
		max: 20,
		min: 5,
		acquire: 30000,
		idle: 10000,
	},
});

/**
 * Initialize the database with limited retries so ephemeral DNS timing or network
 * hiccups (common on first container start) don't permanently fail boot.
 */
export const initializeDatabase = async (
	retries = 4,
	delayMs = 3000
): Promise<void> => {
	if (AppDataSource.isInitialized) return; // Already ready
	let attempt = 0;
	while (attempt <= retries && !AppDataSource.isInitialized) {
		try {
			attempt++;
			if (attempt > 1) {
				console.log(`⏳ DB init retry ${attempt}/${retries + 1} ...`);
			}
			await AppDataSource.initialize();
			console.log("✅ Database connection established successfully");
			if (process.env.NODE_ENV === "development") {
				console.log("🔄 Database synchronized in development mode");
			}
			// In production (or any non-dev) run pending migrations (idempotent)
			if (process.env.NODE_ENV !== "development") {
				try {
					const hadPending = await AppDataSource.showMigrations();
					const executed = await AppDataSource.runMigrations();
					if (hadPending) {
						console.log(`📦 Executed ${executed.length} migration(s).`);
						executed.forEach((m) => console.log(`   ▶ ${m.name}`));
					} else {
						console.log("✅ No pending migrations – schema up to date.");
					}
				} catch (mErr) {
					console.error(
						"⚠️ Migration execution failed (continuing – app may have outdated schema):",
						mErr
					);
				}
			}
			return;
		} catch (error: any) {
			console.error(
				`❌ DB init attempt ${attempt} failed:`,
				error?.message || error
			);
			if (attempt > retries) {
				console.error("🚫 Exhausted DB initialization retries.");
				throw error;
			}
			await new Promise((res) => setTimeout(res, delayMs));
		}
	}
};

/**
 * Ensure database is initialized before any database operations
 */
export const ensureDbInitialized = async (): Promise<void> => {
	if (!AppDataSource.isInitialized) {
		console.log("🔄 Database not initialized, attempting connection...");
		await initializeDatabase();
	}
};
