import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
} from "typeorm";
import { IsNotEmpty, IsOptional, IsEnum } from "class-validator";

export enum ContactStatus {
	PENDING = "pending",
	PROCESSED = "processed",
	REPLIED = "replied",
}

@Entity("contacts")
@Index(["status"])
@Index(["createdAt"])
export class Contact {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", length: 100 })
	@IsNotEmpty({ message: "Name is required" })
	name: string;

	@Column({ type: "varchar", length: 20, nullable: true })
	@IsOptional()
	phone?: string;

	@Column({ type: "text" })
	@IsNotEmpty({ message: "Message is required" })
	message: string;

	@Column({
		type: "enum",
		enum: ContactStatus,
		default: ContactStatus.PENDING,
	})
	@IsEnum(ContactStatus)
	status: ContactStatus;

	@Column({ type: "varchar", length: 45, nullable: true })
	ipAddress?: string;

	@Column({ type: "text", nullable: true })
	userAgent?: string;

	@Column({ type: "text", nullable: true })
	adminNotes?: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
