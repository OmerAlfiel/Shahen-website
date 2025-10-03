import { DataSource } from "typeorm";
import { Contact } from "../entities/Contact";

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
	migrations: ["src/migrations/*.ts"],
	ssl:
		process.env.NODE_ENV === "production"
			? { rejectUnauthorized: false }
			: false,
});

export const initializeDatabase = async (): Promise<void> => {
	try {
		await AppDataSource.initialize();
		console.log("✅ Database connection established successfully");

		if (process.env.NODE_ENV === "development") {
			console.log("🔄 Contact database synchronized in development mode");
		}
	} catch (error) {
		console.error("❌ Error during database initialization:", error);
		throw error;
	}
};
