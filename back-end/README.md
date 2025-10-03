# Shahen Backend API# Shahen Backend API

A TypeScript-based backend API for the Shahen logistics website, featuring a contact module for handling customer inquiries.A TypeScript-based backend API for the Shahen logistics website, featuring a contact module for handling customer inquiries.

## Features## Features

- **Contact Module**: Handle contact form submissions with validation- **Contact Module**: Handle contact form submissions with validation

- **TypeScript**: Full type safety and modern JavaScript features- **TypeScript**: Full type safety and modern JavaScript features

- **Express.js**: Fast and minimal web framework- **Express.js**: Fast and minimal web framework

- **PostgreSQL**: Database integration with TypeORM- **PostgreSQL**: Database integration with TypeORM

- **CORS**: Configured for frontend integration- **CORS**: Configured for frontend integration

- **Input Validation**: Comprehensive form validation- **Input Validation**: Comprehensive form validation

- **Error Handling**: Centralized error handling middleware- **Error Handling**: Centralized error handling middleware

- **Logging**: Request logging middleware- **Logging**: Request logging middleware

## Project Structure## Project Structure

```

src/src/

├── index.ts # Main application entry point├── index.ts # Main application entry point

├── types/ # TypeScript type definitions├── types/ # TypeScript type definitions

│ └── index.ts│ └── index.ts

├── middleware/ # Express middleware├── middleware/ # Express middleware

│ ├── errorHandler.ts│ ├── errorHandler.ts

│ └── logger.ts│ └── logger.ts

├── utils/ # Utility functions├── utils/ # Utility functions

│ ├── validation.ts│ ├── validation.ts

│ └── response.ts│ └── response.ts

└── modules/└── modules/

    └── contact/ # Contact module    └── contact/ # Contact module

        ├── contact.controller.ts        ├── contact.controller.ts

        ├── contact.service.ts        ├── contact.service.ts

        └── contact.routes.ts        └── contact.routes.ts

```

## API Endpoints## API Endpoints

### Health Check### Health Check

- `GET /api/health` - API health check- `GET /api/health` - API health check

### Contact### Contact

- `POST /api/contact` - Submit a contact form- `POST /api/contact` - Submit a contact form

- `GET /api/contact` - Get all contact submissions (admin)- `GET /api/contact` - Get all contact submissions (admin)

- `GET /api/contact/:id` - Get a specific contact submission- `GET /api/contact/:id` - Get a specific contact submission

## Getting Started## Getting Started

### Prerequisites### Prerequisites

- Node.js (v16 or higher)- Node.js (v16 or higher)

- PostgreSQL- PostgreSQL

- npm- npm

### Installation### Installation

1. Install dependencies:1. Install dependencies:

`bash`bash

npm installnpm install

````



2. Set up environment variables:2. Set up environment variables:



```bash```bash

cp .env.example .envcp .env.example .env

````

3. Build the project:3. Build the project:

`bash`bash

npm run buildnpm run build

````



### Development### Development



Start the development server with hot reload:Start the development server with hot reload:



```bash```bash

npm run devnpm run dev

````

### Production### Production

Build and start the production server:Build and start the production server:

`bash`bash

npm run buildnpm run build

npm startnpm start

````



## Environment Variables## Environment Variables



- `PORT` - Server port (default: 3001)- `PORT` - Server port (default: 3001)

- `NODE_ENV` - Environment (development/production)- `NODE_ENV` - Environment (development/production)

- `FRONTEND_URL` - Frontend URL for CORS- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)



## Contact Form API## Contact Form API



### Request Body### Request Body



```typescript```typescript

{{

  "name": "John Doe",        // Required: Customer name  "name": "John Doe",        // Required: Customer name

  "phone": "+1234567890",    // Optional: Phone number  "phone": "+1234567890",    // Optional: Phone number

  "company": "ABC Corp",     // Optional: Company name  "company": "ABC Corp",     // Optional: Company name

  "subject": "Inquiry",      // Optional: Message subject  "subject": "Inquiry",      // Optional: Message subject

  "message": "Hello..."      // Required: Message content  "message": "Hello..."      // Required: Message content

}}

````

### Response### Response

`typescript`typescript

{{

"success": true, "success": true,

"data": { "data": {

    "id": "uuid",    "id": "uuid",

    "name": "John Doe",    "name": "John Doe",

    "phone": "+1234567890",    "phone": "+1234567890",

    "company": "ABC Corp",    "company": "ABC Corp",

    "subject": "Inquiry",    "subject": "Inquiry",

    "message": "Hello...",    "message": "Hello...",

    "submittedAt": "2023-01-01T00:00:00.000Z"    "submittedAt": "2023-01-01T00:00:00.000Z"

}, },

"message": "Contact form submitted successfully" "message": "Contact form submitted successfully"

}}

`````



## Database Schema## Database Schema



The application uses PostgreSQL with TypeORM. The main entity is:The application uses PostgreSQL with TypeORM. The main entity is:



### Contact Entity### Contact Entity



- `id` (UUID) - Primary key- `id` (UUID) - Primary key

- `name` (VARCHAR) - Customer name (required)- `name` (VARCHAR) - Customer name (required)

- `phone` (VARCHAR) - Phone number (optional)- `phone` (VARCHAR) - Phone number (optional)

- `company` (VARCHAR) - Company name (optional)- `company` (VARCHAR) - Company name (optional)

- `subject` (VARCHAR) - Message subject (optional)- `subject` (VARCHAR) - Message subject (optional)

- `message` (TEXT) - Message content (required)- `message` (TEXT) - Message content (required)

- `submittedAt` (TIMESTAMP) - Submission timestamp- `submittedAt` (TIMESTAMP) - Submission timestamp

- `ipAddress` (VARCHAR) - Client IP address- `ipAddress` (VARCHAR) - Client IP address

- `userAgent` (TEXT) - Client user agent- `userAgent` (TEXT) - Client user agent



## License## License



This project is licensed under the MIT License.This project is licensed under the MIT License.

- `company` (VARCHAR) - Company name _optional_

- `subject` (VARCHAR) - Message subject _optional_### Submit Contact Form

- `message` (TEXT) - Message content _required_

- `status` (ENUM) - Status: pending, processed, replied**POST** `/api/contact`

- `ipAddress` (VARCHAR) - Client IP address

- `userAgent` (TEXT) - Browser/client info**Request Body:**

- `adminNotes` (TEXT) - Admin notes _optional_

- `createdAt` (TIMESTAMP) - Creation time```json

- `updatedAt` (TIMESTAMP) - Last update time{

  "name": "John Doe",

## 🔧 Development Commands "email": "john@example.com",

    "phone": "+1234567890",

````bash "company": "Example Inc.",

npm run dev      # Start development server	"subject": "Business Inquiry",

npm run build    # Build for production	"message": "I would like to know more about your services."

npm start        # Start production server}

npm run db:seed  # Initialize database (optional)```

````

**Response:**

## 📝 Validation Rules

```json

- **Name**: 2-100 characters, required{

- **Email**: Valid email format, optional	"status": "success",

- **Phone**: Valid international format, optional	"message": "Your message has been received successfully. We will get back to you soon!",

- **Contact Method**: Either email or phone required	"data": {

- **Message**: 10-2000 characters, required		"success": true,

- **Subject**: Max 200 characters, optional		"message": "Your message has been received successfully. We will get back to you soon!",

- **Company**: Max 100 characters, optional		"id": "unique-submission-id"

	}

## 🔍 Example Requests}

```

### Submit Contact Form

```bash### Validation Rules

curl -X POST http://localhost:3001/api/contact \

  -H "Content-Type: application/json" \- **name**: Required, minimum 2 characters

  -d '{- **email**: Required, valid email format

    "name": "John Doe",- **phone**: Optional, valid phone number format if provided

    "email": "john@example.com",- **company**: Optional

    "phone": "+1234567890",- **subject**: Optional, maximum 200 characters

    "subject": "Service Inquiry",- **message**: Required, minimum 10 characters

    "message": "I would like to know more about your services."

  }'## Development Notes

```

- The current implementation stores submissions in memory

### Get Contact Statistics- For production, integrate with a database (MongoDB, PostgreSQL, etc.)

````bash- Consider adding email notifications for new submissions

curl http://localhost:3001/api/contact/stats- Add authentication for admin endpoints

```- Implement rate limiting for security



Response:## Scripts

```json

{- `npm run dev` - Start development server with hot reload

  "status": "success",- `npm run build` - Build for production

  "data": {- `npm start` - Start production server

    "total": 150,- `npm run clean` - Clean build directory

    "pending": 45,
    "processed": 80,
    "replied": 25,
    "todayCount": 8
  }
}
````

## 🛡️ Security Features

- Input validation and sanitization
- SQL injection protection via TypeORM
- IP address and user agent logging
- CORS configuration
- Request size limits

## 📈 Response Format

All API responses follow this format:

```json
{
	"status": "success|error",
	"message": "Description",
	"data": {} // Response data (if applicable)
}
```

## 🐛 Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists and user has permissions

### Validation Errors

- Check that either email or phone is provided
- Verify message length (10-2000 characters)
- Ensure name is at least 2 characters

## 📚 Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Database
- **class-validator** - Input validation
- **CORS** - Cross-origin requests
`````
