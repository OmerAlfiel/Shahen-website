const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export interface QuotePayload {
	deliveryType: "single" | "multiple";
	pickupLocation: string;
	dropLocation1: string;
	dropLocation2?: string;
	truckLabel: string;
	quantity: number;
	dateISO: string;
	timeLabel: string;
	loadType: string;
	loadQuantity?: number;
	loadExact?: string;
	insuranceValue?: number;
	language?: "ar" | "en";
}

export interface QuoteBreakdownItem {
	label: string;
	amount: number;
}

export interface QuoteData {
	estimate: number;
	currency: string;
	breakdown: QuoteBreakdownItem[];
	etaMinutes: number;
}

export interface QuoteResponse {
	status: "success" | "error";
	message: string;
	data?: QuoteData;
	error?: string;
}

export class ApiError extends Error {
	status?: number;
	constructor(options: { message: string; status?: number }) {
		super(options.message);
		this.status = options.status;
		this.name = "ApiError";
	}
}

export class QuoteApi {
	private baseUrl: string;
	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	async estimate(payload: QuotePayload): Promise<QuoteResponse> {
		try {
			const response = await fetch(`${this.baseUrl}/quote/estimate`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const json = await response.json().catch(() => null);
			if (!response.ok) {
				const message =
					json?.message || `HTTP error! status: ${response.status}`;
				throw new ApiError({ message, status: response.status });
			}
			return json as QuoteResponse;
		} catch (error) {
			if (error instanceof ApiError) throw error;
			throw new ApiError({
				message: error instanceof Error ? error.message : "Failed to get quote",
			});
		}
	}
}

export const quoteApi = new QuoteApi();
