# Express.js Backend API Documentation

This document outlines the RESTful API endpoints needed for the shipping platform backend.

## Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

---

## Endpoints

### Authentication

#### POST /api/auth/register
Register a new user account.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+966501234567",
  "userType": "individual" // or "company"
}
\`\`\`

**Response:**
\`\`\`json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+966501234567",
    "userType": "individual"
  }
}
\`\`\`

#### POST /api/auth/login
Login to existing account.

**Request Body:**
\`\`\`json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
\`\`\`

---

### Orders

#### POST /api/orders
Create a new shipping order.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
\`\`\`json
{
  "pickupLocation": {
    "address": "King Fahd Road, Riyadh",
    "coordinates": {
      "lat": 24.7136,
      "lng": 46.6753
    },
    "city": "Riyadh",
    "country": "Saudi Arabia"
  },
  "deliveryLocations": [
    {
      "address": "Olaya Street, Riyadh",
      "coordinates": {
        "lat": 24.6877,
        "lng": 46.7219
      }
    }
  ],
  "truckType": "refrigerated",
  "truckSize": "4-ton",
  "cargoValue": 50000,
  "cargoInsurance": true,
  "loadingManagerPhone": "+966501234567",
  "receivingManagerPhone": "+966507654321",
  "scheduledDate": "2025-02-15T10:00:00Z",
  "notes": "Handle with care"
}
\`\`\`

**Response:**
\`\`\`json
{
  "orderId": "ORD-2025-001234",
  "status": "pending",
  "estimatedCost": 450.00,
  "estimatedDeliveryTime": "2025-02-15T14:30:00Z",
  "trackingUrl": "https://app.example.com/track/ORD-2025-001234",
  "createdAt": "2025-02-15T09:00:00Z"
}
\`\`\`

#### GET /api/orders/:orderId
Get details of a specific order.

**Headers:** `Authorization: Bearer <token>`

**Response:**
\`\`\`json
{
  "orderId": "ORD-2025-001234",
  "status": "in_progress",
  "estimatedCost": 450.00,
  "estimatedDeliveryTime": "2025-02-15T14:30:00Z",
  "driverInfo": {
    "name": "Ahmed Ali",
    "phone": "+966509876543",
    "vehicleNumber": "ABC-1234",
    "rating": 4.8
  },
  "trackingUrl": "https://app.example.com/track/ORD-2025-001234",
  "createdAt": "2025-02-15T09:00:00Z"
}
\`\`\`

#### GET /api/orders
Get all orders for authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): Filter by status (pending, confirmed, in_progress, delivered, cancelled)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
\`\`\`json
{
  "orders": [
    {
      "orderId": "ORD-2025-001234",
      "status": "in_progress",
      "estimatedCost": 450.00,
      "createdAt": "2025-02-15T09:00:00Z"
    }
  ],
  "total": 25,
  "page": 1
}
\`\`\`

#### POST /api/orders/:orderId/track
Get real-time tracking data for an order.

**Headers:** `Authorization: Bearer <token>`

**Response:**
\`\`\`json
{
  "orderId": "ORD-2025-001234",
  "status": "in_progress",
  "currentLocation": {
    "lat": 24.7000,
    "lng": 46.7000
  },
  "estimatedArrival": "2025-02-15T14:30:00Z",
  "driverInfo": {
    "id": "driver_123",
    "name": "Ahmed Ali",
    "phone": "+966509876543",
    "rating": 4.8,
    "vehicleNumber": "ABC-1234"
  },
  "route": [
    { "lat": 24.7136, "lng": 46.6753 },
    { "lat": 24.7000, "lng": 46.7000 },
    { "lat": 24.6877, "lng": 46.7219 }
  ]
}
\`\`\`

#### POST /api/orders/:orderId/cancel
Cancel an order.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
\`\`\`json
{
  "reason": "Changed delivery schedule"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Order cancelled successfully"
}
\`\`\`

---

### Trucks

#### GET /api/trucks
Get available truck types.

**Response:**
\`\`\`json
[
  {
    "id": "truck_001",
    "name": "Refrigerated Truck",
    "nameAr": "دينا مبرد",
    "capacity": "4 tons",
    "size": "4.5 meters",
    "pricePerKm": 5.50,
    "available": true,
    "features": ["refrigerated", "gps_tracking", "insured"]
  }
]
\`\`\`

---

### Drivers

#### GET /api/drivers/available
Get available drivers near a location.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `lat`: Latitude
- `lng`: Longitude
- `radius`: Search radius in km (default: 10)

**Response:**
\`\`\`json
[
  {
    "id": "driver_123",
    "name": "Ahmed Ali",
    "phone": "+966509876543",
    "rating": 4.8,
    "totalTrips": 342,
    "vehicleType": "refrigerated",
    "vehicleNumber": "ABC-1234",
    "licenseNumber": "LIC-567890",
    "isVerified": true,
    "currentLocation": {
      "lat": 24.7136,
      "lng": 46.6753
    }
  }
]
\`\`\`

---

### Quotes

#### POST /api/quotes
Get price quote for a shipment.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
\`\`\`json
{
  "pickupLocation": {
    "address": "King Fahd Road, Riyadh",
    "coordinates": { "lat": 24.7136, "lng": 46.6753 }
  },
  "deliveryLocations": [
    {
      "address": "Olaya Street, Riyadh",
      "coordinates": { "lat": 24.6877, "lng": 46.7219 }
    }
  ],
  "truckType": "refrigerated"
}
\`\`\`

**Response:**
\`\`\`json
{
  "estimatedCost": 450.00,
  "distance": 15.5,
  "estimatedTime": "45 minutes"
}
\`\`\`

---

## Database Schema

### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  userType: String (enum: ['individual', 'company', 'driver']),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Orders Collection
\`\`\`javascript
{
  _id: ObjectId,
  orderId: String (unique),
  userId: ObjectId (ref: Users),
  driverId: ObjectId (ref: Users),
  pickupLocation: {
    address: String,
    coordinates: { lat: Number, lng: Number },
    city: String,
    country: String
  },
  deliveryLocations: [{
    address: String,
    coordinates: { lat: Number, lng: Number }
  }],
  truckType: String,
  truckSize: String,
  cargoValue: Number,
  cargoInsurance: Boolean,
  loadingManagerPhone: String,
  receivingManagerPhone: String,
  status: String (enum: ['pending', 'confirmed', 'in_progress', 'delivered', 'cancelled']),
  estimatedCost: Number,
  actualCost: Number,
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  scheduledDate: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Trucks Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String,
  nameAr: String,
  capacity: String,
  size: String,
  pricePerKm: Number,
  available: Boolean,
  features: [String],
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Drivers Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  vehicleType: String,
  vehicleNumber: String,
  licenseNumber: String,
  rating: Number,
  totalTrips: Number,
  isVerified: Boolean,
  currentLocation: {
    lat: Number,
    lng: Number,
    updatedAt: Date
  },
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

---

## Error Responses

All endpoints return errors in this format:

\`\`\`json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "status": 400
  }
}
\`\`\`

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
\`\`\`

\`\`\`tsx file="" isHidden
