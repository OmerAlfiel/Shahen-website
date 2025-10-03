import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696348800000 implements MigrationInterface {
	name = "InitialMigration1696348800000";

	public async up(queryRunner: QueryRunner): Promise<void> {
		// Enable UUID extension if not exists
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

		// Create contacts table
		await queryRunner.query(`
            CREATE TABLE "contacts" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "phone" character varying(20),
                "subject" character varying(200),
                "message" text NOT NULL,
                "status" character varying NOT NULL DEFAULT 'pending',
                "ipAddress" character varying(45),
                "userAgent" text,
                "adminNotes" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_contacts_id" PRIMARY KEY ("id")
            )
        `);

		// Create indexes for better performance
		await queryRunner.query(
			`CREATE INDEX "IDX_contacts_status" ON "contacts" ("status")`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_contacts_createdAt" ON "contacts" ("createdAt")`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// Drop indexes
		await queryRunner.query(`DROP INDEX "IDX_contacts_createdAt"`);
		await queryRunner.query(`DROP INDEX "IDX_contacts_status"`);

		// Drop table
		await queryRunner.query(`DROP TABLE "contacts"`);
	}
}
