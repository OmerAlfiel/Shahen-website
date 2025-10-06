import { Repository } from "typeorm";
import { AppDataSource, ensureDbInitialized } from "../config/database";
import { Contact, ContactStatus } from "../entities/Contact";

export class ContactRepository {
	private repository: Repository<Contact> | null = null;

	private async getRepository(): Promise<Repository<Contact>> {
		if (!this.repository) {
			await ensureDbInitialized();
			this.repository = AppDataSource.getRepository(Contact);
		}
		return this.repository;
	}

	async create(contactData: Partial<Contact>): Promise<Contact> {
		const repository = await this.getRepository();
		const contact = repository.create(contactData);
		return await repository.save(contact);
	}

	async findAll(options?: {
		status?: ContactStatus;
		limit?: number;
		offset?: number;
		sortBy?: keyof Contact;
		sortOrder?: "ASC" | "DESC";
	}): Promise<{ contacts: Contact[]; total: number }> {
		const repository = await this.getRepository();
		const queryBuilder = repository.createQueryBuilder("contact");

		if (options?.status) {
			queryBuilder.where("contact.status = :status", {
				status: options.status,
			});
		}

		// Add sorting
		const sortBy = options?.sortBy || "createdAt";
		const sortOrder = options?.sortOrder || "DESC";
		queryBuilder.orderBy(`contact.${sortBy}`, sortOrder);

		// Add pagination
		if (options?.limit) {
			queryBuilder.limit(options.limit);
		}
		if (options?.offset) {
			queryBuilder.offset(options.offset);
		}

		const [contacts, total] = await queryBuilder.getManyAndCount();
		return { contacts, total };
	}

	async findById(id: string): Promise<Contact | null> {
		const repository = await this.getRepository();
		return await repository.findOne({ where: { id } });
	}

	async updateStatus(
		id: string,
		status: ContactStatus,
		adminNotes?: string
	): Promise<Contact | null> {
		const repository = await this.getRepository();
		const contact = await this.findById(id);
		if (!contact) {
			return null;
		}

		contact.status = status;
		if (adminNotes) {
			contact.adminNotes = adminNotes;
		}

		return await repository.save(contact);
	}

	async delete(id: string): Promise<boolean> {
		const repository = await this.getRepository();
		const result = await repository.delete(id);
		return result.affected !== 0;
	}

	async getStats(): Promise<{
		total: number;
		pending: number;
		processed: number;
		replied: number;
		todayCount: number;
	}> {
		const repository = await this.getRepository();
		const total = await repository.count();
		const pending = await repository.count({
			where: { status: ContactStatus.PENDING },
		});
		const processed = await repository.count({
			where: { status: ContactStatus.PROCESSED },
		});
		const replied = await repository.count({
			where: { status: ContactStatus.REPLIED },
		});

		// Count today's submissions using PostgreSQL date functions
		const todayCount = await repository
			.createQueryBuilder("contact")
			.where("DATE(contact.createdAt) = CURRENT_DATE")
			.getCount();

		return { total, pending, processed, replied, todayCount };
	}

	async searchContacts(
		searchTerm: string,
		options?: {
			limit?: number;
			offset?: number;
		}
	): Promise<{ contacts: Contact[]; total: number }> {
		const repository = await this.getRepository();
		const queryBuilder = repository.createQueryBuilder("contact");

		queryBuilder.where(
			"contact.name ILIKE :searchTerm OR contact.message ILIKE :searchTerm",
			{ searchTerm: `%${searchTerm}%` }
		);

		queryBuilder.orderBy("contact.createdAt", "DESC");

		if (options?.limit) {
			queryBuilder.limit(options.limit);
		}
		if (options?.offset) {
			queryBuilder.offset(options.offset);
		}

		const [contacts, total] = await queryBuilder.getManyAndCount();
		return { contacts, total };
	}
}
