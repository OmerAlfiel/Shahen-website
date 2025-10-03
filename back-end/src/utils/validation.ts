import {
	ContactFormData,
	ContactValidationResult,
	ValidationError,
} from "../types";

export const validatePhone = (phone: string): boolean => {
	const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
	return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
};

export const validateContactForm = (
	data: ContactFormData
): ContactValidationResult => {
	const errors: ValidationError[] = [];

	// Name validation
	if (!data.name || data.name.trim().length < 2) {
		errors.push({
			field: "name",
			message: "Name must be at least 2 characters long",
		});
	}

	if (data.name && data.name.length > 100) {
		errors.push({
			field: "name",
			message: "Name must be less than 100 characters",
		});
	}

	// Phone validation (optional but if provided, must be valid)
	if (data.phone && !validatePhone(data.phone)) {
		errors.push({
			field: "phone",
			message: "Please provide a valid phone number",
		});
	}

	// Message validation
	if (!data.message || data.message.trim().length < 10) {
		errors.push({
			field: "message",
			message: "Message must be at least 10 characters long",
		});
	}

	if (data.message && data.message.length > 2000) {
		errors.push({
			field: "message",
			message: "Message must be less than 2000 characters",
		});
	}

	// Subject validation (optional but if provided, must be reasonable length)
	if (data.subject && data.subject.length > 200) {
		errors.push({
			field: "subject",
			message: "Subject must be less than 200 characters",
		});
	}

	// Company validation (optional)
	if (data.company && data.company.length > 100) {
		errors.push({
			field: "company",
			message: "Company name must be less than 100 characters",
		});
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};
