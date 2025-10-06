import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Contact } from "../entities/Contact";

dotenv.config();

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432"),
	username: process.env.DB_USERNAME || "postgres",
	password: process.env.DB_PASSWORD || "postgres",
	database: process.env.DB_NAME || "shahen_logistics",
	synchronize: process.env.NODE_ENV === "development",
	logging: process.env.NODE_ENV === "development",
	entities: [Contact],
	migrations: ["dist/migrations/*.js"],
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

export const initializeDatabase = async (): Promise<void> => {
	try {
		if (!AppDataSource.isInitialized) {
			await AppDataSource.initialize();
			console.log("✅ Database connection established successfully");

			if (process.env.NODE_ENV === "development") {
				console.log("🔄 Database synchronized in development mode");
			}
		}
	} catch (error) {
		console.error("❌ Error during database initialization:", error);
		throw error;
	}
};
