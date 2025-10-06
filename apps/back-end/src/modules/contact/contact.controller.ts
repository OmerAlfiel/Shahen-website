import { Request, Response, NextFunction } from "express";
import { ContactFormData } from "../../types";
import { validateContactForm } from "../../utils/validation";
import { sendSuccess, sendError } from "../../utils/response";
import { ContactService } from "./contact.service";
import { ContactStatus } from "../../entities/Contact";

export class ContactController {
	private contactService: ContactService;

	constructor() {
		this.contactService = new ContactService();
	}

	async submitContactForm(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const contactData: ContactFormData = req.body;

			// Validate the contact form data
			const validation = validateContactForm(contactData);

			if (!validation.isValid) {
				sendError(
					res,
					"Validation failed",
					400,
					JSON.stringify(validation.errors)
				);
				return;
			}

			// Get client IP and user agent
			const ipAddress =
				req.ip ||
				req.connection.remoteAddress ||
				(req.headers["x-forwarded-for"] as string);
			const userAgent = req.headers["user-agent"];

			// Process the contact form
			const result = await this.contactService.processContactForm(
				contactData,
				ipAddress,
				userAgent
			);

			if (result.success) {
				sendSuccess(res, "Contact form submitted successfully", result, 201);
			} else {
				sendError(res, result.message, 400);
			}
		} catch (error) {
			next(error);
		}
	}

	async getContactSubmissions(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const {
				status,
				limit = 20,
				offset = 0,
				sortBy = "createdAt",
				sortOrder = "DESC",
			} = req.query;

			const options = {
				status: status as ContactStatus,
				limit: parseInt(limit as string),
				offset: parseInt(offset as string),
				sortBy: sortBy as any,
				sortOrder: sortOrder as "ASC" | "DESC",
			};

			const result = await this.contactService.getAllSubmissions(options);
			sendSuccess(res, "Contact submissions retrieved successfully", result);
		} catch (error) {
			next(error);
		}
	}

	async getContactSubmissionById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				sendError(res, "ID parameter is required", 400);
				return;
			}

			const submission = await this.contactService.getSubmissionById(id);

			if (submission) {
				sendSuccess(
					res,
					"Contact submission retrieved successfully",
					submission
				);
			} else {
				sendError(res, "Contact submission not found", 404);
			}
		} catch (error) {
			next(error);
		}
	}

	async updateContactStatus(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.params;
			const { status, adminNotes } = req.body;

			if (!id) {
				sendError(res, "ID parameter is required", 400);
				return;
			}

			if (!Object.values(ContactStatus).includes(status)) {
				sendError(res, "Invalid status value", 400);
				return;
			}

			const updatedContact = await this.contactService.updateSubmissionStatus(
				id,
				status,
				adminNotes
			);

			if (updatedContact) {
				sendSuccess(res, "Contact status updated successfully", updatedContact);
			} else {
				sendError(res, "Contact submission not found", 404);
			}
		} catch (error) {
			next(error);
		}
	}

	async searchContacts(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { q: searchTerm, limit = 20, offset = 0 } = req.query;

			if (!searchTerm) {
				sendError(res, "Search term is required", 400);
				return;
			}

			const options = {
				limit: parseInt(limit as string),
				offset: parseInt(offset as string),
			};

			const result = await this.contactService.searchContacts(
				searchTerm as string,
				options
			);

			sendSuccess(res, "Search results retrieved successfully", result);
		} catch (error) {
			next(error);
		}
	}

	async getContactStats(
		_req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const stats = await this.contactService.getContactStats();
			sendSuccess(res, "Contact statistics retrieved successfully", stats);
		} catch (error) {
			next(error);
		}
	}

	async deleteContact(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.params;

			if (!id) {
				sendError(res, "ID parameter is required", 400);
				return;
			}

			const deleted = await this.contactService.deleteSubmission(id);

			if (deleted) {
				sendSuccess(res, "Contact deleted successfully");
			} else {
				sendError(res, "Contact submission not found", 404);
			}
		} catch (error) {
			next(error);
		}
	}
}

export const contactController = new ContactController();
