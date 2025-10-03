// Contact API Service - Dedicated API for contact form functionality
const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";

// Contact form data interface
export interface ContactFormData {
	name: string;
	phone: string;
	company?: string;
	message: string;
	subject?: string;
}

// Contact API response interface
export interface ContactResponse {
	success: boolean;
	message: string;
	id?: string;
}

// API error class
export class ApiError extends Error {
	status?: number;

	constructor(options: { message: string; status?: number }) {
		super(options.message);
		this.status = options.status;
		this.name = "ApiError";
	}
}

// Contact API class
export class ContactApi {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Submit contact form data to the backend
	 */
	async submitContactForm(data: ContactFormData): Promise<ContactResponse> {
		try {
			const response = await fetch(`${this.baseUrl}/contact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || `HTTP error! status: ${response.status}`
				);
			}

			const result = await response.json();
			return result;
		} catch (error) {
			console.error("Contact form submission error:", error);
			throw new ApiError({
				message:
					error instanceof Error
						? error.message
						: "Failed to submit contact form",
				status:
					error instanceof Error && "status" in error
						? (error as any).status
						: undefined,
			});
		}
	}

	/**
	 * Get contact submission by ID (for future use)
	 */
	async getContactSubmission(id: string): Promise<any> {
		try {
			const response = await fetch(`${this.baseUrl}/contact/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return response.json();
		} catch (error) {
			console.error("Get contact submission error:", error);
			throw new ApiError({
				message:
					error instanceof Error
						? error.message
						: "Failed to fetch contact submission",
			});
		}
	}
}

// Export singleton instance
export const contactApi = new ContactApi();

// Export default methods for easier usage
export const submitContactForm = (data: ContactFormData) =>
	contactApi.submitContactForm(data);

export const getContactSubmission = (id: string) =>
	contactApi.getContactSubmission(id);
