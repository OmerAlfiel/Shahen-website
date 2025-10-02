// API Service Layer for Express.js Backend Integration
// This file defines all API endpoints and data flow for future backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Types for API requests and responses
export interface Location {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  city?: string
  country?: string
}

export interface OrderRequest {
  pickupLocation: Location
  deliveryLocations: Location[]
  truckType: string
  truckSize: string
  cargoValue: number
  cargoInsurance: boolean
  loadingManagerPhone: string
  receivingManagerPhone: string
  scheduledDate?: string
  notes?: string
}

export interface OrderResponse {
  orderId: string
  status: "pending" | "confirmed" | "in_progress" | "delivered" | "cancelled"
  estimatedCost: number
  estimatedDeliveryTime: string
  driverInfo?: {
    name: string
    phone: string
    vehicleNumber: string
    rating: number
  }
  trackingUrl: string
  createdAt: string
}

export interface TruckType {
  id: string
  name: string
  nameAr: string
  capacity: string
  size: string
  pricePerKm: number
  available: boolean
  features: string[]
}

export interface Driver {
  id: string
  name: string
  phone: string
  rating: number
  totalTrips: number
  vehicleType: string
  vehicleNumber: string
  licenseNumber: string
  isVerified: boolean
  currentLocation?: {
    lat: number
    lng: number
  }
}

export interface TrackingData {
  orderId: string
  status: string
  currentLocation: {
    lat: number
    lng: number
  }
  estimatedArrival: string
  driverInfo: Driver
  route: Array<{
    lat: number
    lng: number
  }>
}

// API Endpoints Documentation
/**
 * POST /api/orders
 * Create a new shipping order
 * Body: OrderRequest
 * Response: OrderResponse
 */
export async function createOrder(orderData: OrderRequest): Promise<OrderResponse> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    throw new Error("Failed to create order")
  }

  return response.json()
}

/**
 * GET /api/orders/:orderId
 * Get order details by ID
 * Response: OrderResponse
 */
export async function getOrder(orderId: string): Promise<OrderResponse> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch order")
  }

  return response.json()
}

/**
 * GET /api/orders
 * Get all orders for authenticated user
 * Query params: ?status=pending&page=1&limit=10
 * Response: { orders: OrderResponse[], total: number, page: number }
 */
export async function getOrders(params?: {
  status?: string
  page?: number
  limit?: number
}): Promise<{ orders: OrderResponse[]; total: number; page: number }> {
  const queryString = new URLSearchParams(params as any).toString()
  const response = await fetch(`${API_BASE_URL}/orders?${queryString}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }

  return response.json()
}

/**
 * GET /api/trucks
 * Get available truck types
 * Response: TruckType[]
 */
export async function getTruckTypes(): Promise<TruckType[]> {
  const response = await fetch(`${API_BASE_URL}/trucks`)

  if (!response.ok) {
    throw new Error("Failed to fetch truck types")
  }

  return response.json()
}

/**
 * POST /api/orders/:orderId/track
 * Get real-time tracking data for an order
 * Response: TrackingData
 */
export async function trackOrder(orderId: string): Promise<TrackingData> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/track`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to track order")
  }

  return response.json()
}

/**
 * POST /api/orders/:orderId/cancel
 * Cancel an order
 * Response: { success: boolean, message: string }
 */
export async function cancelOrder(orderId: string, reason: string): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ reason }),
  })

  if (!response.ok) {
    throw new Error("Failed to cancel order")
  }

  return response.json()
}

/**
 * POST /api/auth/login
 * User login
 * Body: { email: string, password: string }
 * Response: { token: string, user: User }
 */
export async function login(email: string, password: string): Promise<{ token: string; user: any }> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  const data = await response.json()
  setAuthToken(data.token)
  return data
}

/**
 * POST /api/auth/register
 * User registration
 * Body: { name: string, email: string, password: string, phone: string, userType: 'individual' | 'company' }
 * Response: { token: string, user: User }
 */
export async function register(userData: {
  name: string
  email: string
  password: string
  phone: string
  userType: "individual" | "company"
}): Promise<{ token: string; user: any }> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Registration failed")
  }

  const data = await response.json()
  setAuthToken(data.token)
  return data
}

/**
 * GET /api/drivers/available
 * Get available drivers near a location
 * Query params: ?lat=24.7136&lng=46.6753&radius=10
 * Response: Driver[]
 */
export async function getAvailableDrivers(lat: number, lng: number, radius = 10): Promise<Driver[]> {
  const response = await fetch(`${API_BASE_URL}/drivers/available?lat=${lat}&lng=${lng}&radius=${radius}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch available drivers")
  }

  return response.json()
}

/**
 * POST /api/quotes
 * Get price quote for a shipment
 * Body: { pickupLocation: Location, deliveryLocations: Location[], truckType: string }
 * Response: { estimatedCost: number, distance: number, estimatedTime: string }
 */
export async function getQuote(data: {
  pickupLocation: Location
  deliveryLocations: Location[]
  truckType: string
}): Promise<{ estimatedCost: number; distance: number; estimatedTime: string }> {
  const response = await fetch(`${API_BASE_URL}/quotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to get quote")
  }

  return response.json()
}

// Helper functions for token management
function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token)
  }
}

export function clearAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken")
  }
}
