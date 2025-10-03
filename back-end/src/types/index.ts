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

// Quote/Price estimation types
export type DeliveryType = "single" | "multiple";

export interface QuoteRequest {
	deliveryType: DeliveryType;
	pickupLocation: string;
	dropLocation1: string;
	dropLocation2?: string;
	truckLabel: string; // e.g., "تریلا سطحة (25 طن)"
	quantity: number;
	dateISO: string; // ISO date (yyyy-mm-dd)
	timeLabel: string; // e.g., "10:00 AM - 12:00 PM"
	loadType: string; // label from load type picker
	loadQuantity?: number;
	loadExact?: string;
	insuranceValue?: number;
	language?: "ar" | "en";
}

export interface QuoteBreakdownItem {
	label: string;
	amount: number;
}

export interface QuoteResponseData {
	estimate: number;
	currency: string;
	breakdown: QuoteBreakdownItem[];
	etaMinutes: number;
}

export interface QuoteResponse {
	success: boolean;
	message: string;
	data?: QuoteResponseData;
}
