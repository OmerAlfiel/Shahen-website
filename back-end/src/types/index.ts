export interface ContactFormData {
	name: string;
	phone?: string;
	company?: string;
	message: string;
}

export interface ContactResponse {
	success: boolean;
	message: string;
	id?: string;
}

export interface ApiResponse<T = any> {
	status: "success" | "error";
	message: string;
	data?: T;
	error?: string;
}

export interface ValidationError {
	field: string;
	message: string;
}

export interface ContactValidationResult {
	isValid: boolean;
	errors: ValidationError[];
}
