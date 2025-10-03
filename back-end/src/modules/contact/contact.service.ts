import { ContactFormData, ContactResponse } from "../../types";

export interface ContactSubmission extends ContactFormData {
	id: string;
	submittedAt: Date;
	status: "pending" | "processed" | "replied";
}

export class ContactService {
	private submissions: ContactSubmission[] = [];

	async processContactForm(data: ContactFormData): Promise<ContactResponse> {
		try {
			// Generate a unique ID for the submission
			const id = this.generateId();

			// Create a new submission
			const submission: ContactSubmission = {
				...data,
				id,
				submittedAt: new Date(),
				status: "pending",
			};

			// Store the submission (in production, this would be saved to a database)
			this.submissions.push(submission);

			// Log the submission for development
			console.log("New contact form submission:", {
				id: submission.id,
				name: submission.name,
				subject: submission.subject || "No subject",
				submittedAt: submission.submittedAt,
			});

			// In a real application, you might:
			// 1. Save to database
			// 2. Send email notification
			// 3. Add to CRM system
			// 4. Send auto-reply email

			return {
				success: true,
				message:
					"Your message has been received successfully. We will get back to you soon!",
				id,
			};
		} catch (error) {
			console.error("Error processing contact form:", error);
			return {
				success: false,
				message:
					"There was an error processing your request. Please try again later.",
			};
		}
	}

	async getAllSubmissions(): Promise<ContactSubmission[]> {
		// In production, this would query the database
		return this.submissions.sort(
			(a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
		);
	}

	async getSubmissionById(id: string): Promise<ContactSubmission | null> {
		// In production, this would query the database
		return this.submissions.find((submission) => submission.id === id) || null;
	}

	async updateSubmissionStatus(
		id: string,
		status: ContactSubmission["status"]
	): Promise<boolean> {
		const submission = this.submissions.find((sub) => sub.id === id);
		if (submission) {
			submission.status = status;
			return true;
		}
		return false;
	}

	private generateId(): string {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	}
}

export const contactService = new ContactService();
