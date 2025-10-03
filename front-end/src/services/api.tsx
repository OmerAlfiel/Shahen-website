declare const process: any;

// API configuration and client for React app
const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";

// Generic API client
export const apiClient = {
	async post<T>(endpoint: string, data: any): Promise<T> {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	},

	async get<T>(endpoint: string): Promise<T> {
		const response = await fetch(`${API_BASE_URL}${endpoint}`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	},

	async put<T>(endpoint: string, data: any): Promise<T> {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	},

	async delete<T>(endpoint: string): Promise<T> {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	},
};

// Auth API endpoints
export const authApi = {
	sendOtp: (data: { phoneNumber: string }) =>
		apiClient.post("/auth/send-otp", data),

	verifyOtp: (data: { phoneNumber: string; otp: string }) =>
		apiClient.post("/auth/verify-otp", data),

	completeProfile: (data: any) =>
		apiClient.post("/auth/complete-profile", data),

	login: (data: { phone: string; otp: string }) =>
		apiClient.post("/auth/login", data),

	logout: () => apiClient.post("/auth/logout", {}),

	me: () => apiClient.get("/auth/me"),
};

// Order management endpoints
export const orderApi = {
	createOrder: (data: any) => apiClient.post("/orders", data),

	getOrders: () => apiClient.get("/orders"),

	getOrder: (id: string) => apiClient.get(`/orders/${id}`),

	updateOrder: (id: string, data: any) => apiClient.put(`/orders/${id}`, data),

	deleteOrder: (id: string) => apiClient.delete(`/orders/${id}`),
};

// Quote management endpoints
export const quoteApi = {
	requestQuote: (data: any) => apiClient.post("/quotes", data),

	getQuotes: () => apiClient.get("/quotes"),

	getQuote: (id: string) => apiClient.get(`/quotes/${id}`),
};

// Tracking endpoints
export const trackingApi = {
	trackOrder: (trackingNumber: string) =>
		apiClient.get(`/tracking/${trackingNumber}`),
};

// Mapbox endpoints for location services
export const mapboxApi = {
	searchLocation: async (query: string, token: string) => {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
				query
			)}.json?access_token=${token}&country=SA&limit=5`
		);
		return response.json();
	},

	reverseGeocode: async (lng: number, lat: number, token: string) => {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&country=SA&limit=1`
		);
		return response.json();
	},
};

// Mapbox token (you'll need to set this in environment variables)
export const getMapboxToken = () => {
	return process.env.REACT_APP_MAPBOX_TOKEN || "";
};

// Export interfaces for TypeScript
export interface User {
	id: string;
	phoneNumber: string;
	companyName?: string;
	email?: string;
	taxNumber?: string;
	city?: string;
	postalCode?: string;
	address?: string;
	managerName?: string;
}

export interface Order {
	id: string;
	trackingNumber: string;
	from: string;
	to: string;
	truckType: string;
	status: string;
	createdAt: string;
	estimatedDelivery?: string;
}

export interface Quote {
	id: string;
	from: string;
	to: string;
	truckType: string;
	price: number;
	validUntil: string;
	status: string;
}

export interface TrackingInfo {
	trackingNumber: string;
	status: string;
	currentLocation?: string;
	estimatedDelivery?: string;
	history: {
		status: string;
		location: string;
		timestamp: string;
	}[];
}
