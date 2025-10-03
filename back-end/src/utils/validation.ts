import {
	ContactFormData,
	ContactValidationResult,
	ValidationError,
} from "../types";

export const validatePhone = (phone: string): boolean => {
	// Normalize: remove spaces, dashes, parentheses
	const normalized = phone.replace(/[\s\-\(\)]/g, "");
	// Accept E.164 like +9665xxxxxxx OR local formats starting with 0 and 9-15 digits
	const e164 = /^\+[1-9]\d{7,14}$/; // + followed by 8-15 digits total length 9-16 incl +
	const local = /^0?\d{9,15}$/; // optional leading 0 then 9-15 digits
	return e164.test(normalized) || local.test(normalized);
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

	// Subject field removed

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
