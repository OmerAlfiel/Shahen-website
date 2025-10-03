import { Request, Response, NextFunction } from "express";
import { ContactFormData } from "../../types";
import { validateContactForm } from "../../utils/validation";
import { sendSuccess, sendError } from "../../utils/response";
import { contactService } from "./contact.service";

export class ContactController {
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

			// Process the contact form
			const result = await contactService.processContactForm(contactData);

			if (result.success) {
				sendSuccess(res, "Contact form submitted successfully", result, 201);
			} else {
				sendError(res, "Failed to submit contact form", 500);
			}
		} catch (error) {
			next(error);
		}
	}

	async getContactSubmissions(
		_req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const submissions = await contactService.getAllSubmissions();
			sendSuccess(
				res,
				"Contact submissions retrieved successfully",
				submissions
			);
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

			const submission = await contactService.getSubmissionById(id);

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
}

export const contactController = new ContactController();
