import { validate } from "class-validator";
import { ContactFormData, ContactResponse } from "../../types";
import { ContactRepository } from "../../repositories/ContactRepository";
import { Contact, ContactStatus } from "../../entities/Contact";

export class ContactService {
	private contactRepository: ContactRepository;

	constructor() {
		this.contactRepository = new ContactRepository();
	}

	async processContactForm(
		data: ContactFormData,
		ipAddress?: string,
		userAgent?: string
	): Promise<ContactResponse> {
		try {
			// Create contact entity for validation
			const contact = new Contact();
			contact.name = data.name;
			contact.phone = data.phone;
			contact.message = data.message;
			contact.status = ContactStatus.PENDING;
			contact.ipAddress = ipAddress;
			contact.userAgent = userAgent;

			// Validate the contact data
			const errors = await validate(contact);
			if (errors.length > 0) {
				const errorMessages = errors
					.map((error) => Object.values(error.constraints || {}))
					.flat();
				return {
					success: false,
					message: errorMessages.join(", "),
				};
			}

			// Save to database
			const savedContact = await this.contactRepository.create(contact);

			// Log the submission for development
			console.log("✉️ New contact form submission:", {
				id: savedContact.id,
				name: savedContact.name,
				phone: savedContact.phone,
				submittedAt: savedContact.createdAt,
			});

			return {
				success: true,
				message:
					"Your message has been received successfully. We will get back to you soon!",
				id: savedContact.id,
			};
		} catch (error) {
			console.error("❌ Error processing contact form:", error);
			return {
				success: false,
				message:
					"There was an error processing your request. Please try again later.",
			};
		}
	}

	async getAllSubmissions(options?: {
		status?: ContactStatus;
		limit?: number;
		offset?: number;
		sortBy?: keyof Contact;
		sortOrder?: "ASC" | "DESC";
	}): Promise<{ contacts: Contact[]; total: number }> {
		return await this.contactRepository.findAll(options);
	}

	async getSubmissionById(id: string): Promise<Contact | null> {
		return await this.contactRepository.findById(id);
	}

	async updateSubmissionStatus(
		id: string,
		status: ContactStatus,
		adminNotes?: string
	): Promise<Contact | null> {
		return await this.contactRepository.updateStatus(id, status, adminNotes);
	}

	async deleteSubmission(id: string): Promise<boolean> {
		return await this.contactRepository.delete(id);
	}

	async getContactStats(): Promise<{
		total: number;
		pending: number;
		processed: number;
		replied: number;
		todayCount: number;
	}> {
		return await this.contactRepository.getStats();
	}

	async searchContacts(
		searchTerm: string,
		options?: { limit?: number; offset?: number }
	): Promise<{ contacts: Contact[]; total: number }> {
		return await this.contactRepository.searchContacts(searchTerm, options);
	}
}

export const contactService = new ContactService();
