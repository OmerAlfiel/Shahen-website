# Shahen Backend API

A TypeScript-based backend API for the Shahen logistics website, featuring a contact module for handling customer inquiries.

## Features

- **Contact Module**: Handle contact form submissions with validation
- **TypeScript**: Full type safety and modern JavaScript features
- **Express.js**: Fast and minimal web framework
- **CORS**: Configured for frontend integration
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Centralized error handling middleware
- **Logging**: Request logging middleware

## Project Structure

```
src/
├── index.ts                    # Main application entry point
├── types/                      # TypeScript type definitions
│   └── index.ts
├── middleware/                 # Express middleware
│   ├── errorHandler.ts
│   └── logger.ts
├── utils/                      # Utility functions
│   ├── validation.ts
│   └── response.ts
└── modules/
    └── contact/                # Contact module
        ├── contact.controller.ts
        ├── contact.service.ts
        └── contact.routes.ts
```

## API Endpoints

### Health Check

- `GET /api/health` - API health check

### Contact

- `POST /api/contact` - Submit a contact form
- `GET /api/contact` - Get all contact submissions (admin)
- `GET /api/contact/:id` - Get a specific contact submission

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Build the project:

```bash
npm run build
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

### Production

Build and start the production server:

```bash
npm run build
npm start
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)

## Contact Form API

### Submit Contact Form

**POST** `/api/contact`

**Request Body:**

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"phone": "+1234567890",
	"company": "Example Inc.",
	"subject": "Business Inquiry",
	"message": "I would like to know more about your services."
}
```

**Response:**

```json
{
	"status": "success",
	"message": "Your message has been received successfully. We will get back to you soon!",
	"data": {
		"success": true,
		"message": "Your message has been received successfully. We will get back to you soon!",
		"id": "unique-submission-id"
	}
}
```

### Validation Rules

- **name**: Required, minimum 2 characters
- **email**: Required, valid email format
- **phone**: Optional, valid phone number format if provided
- **company**: Optional
- **subject**: Optional, maximum 200 characters
- **message**: Required, minimum 10 characters

## Development Notes

- The current implementation stores submissions in memory
- For production, integrate with a database (MongoDB, PostgreSQL, etc.)
- Consider adding email notifications for new submissions
- Add authentication for admin endpoints
- Implement rate limiting for security

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run clean` - Clean build directory
