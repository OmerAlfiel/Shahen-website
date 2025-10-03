# Shahen Logistics Website

A full-stack logistics platform built with React (TypeScript) frontend and Node.js/Express backend with PostgreSQL database.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (version 12 or higher) - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Shahen-website-main
```

### 2. Database Setup

**Install PostgreSQL** and create a database:

1. Open PostgreSQL command line (psql) or use pgAdmin
2. Create the database and user:

```sql
CREATE DATABASE shahen_logistics;
CREATE USER shahen_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE shahen_logistics TO shahen_user;
```

### 3. Backend Setup

Navigate to the backend folder and set it up:

```bash
cd back-end
```

**Install dependencies:**

```bash
npm install
```

**Configure environment variables:**

```bash
copy .env.example .env
```

Edit the `.env` file and update the database credentials:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=shahen_user
DB_PASSWORD=your_password
DB_NAME=shahen_logistics
```

**Start the backend server:**

```bash
npm run dev
```

The backend will run on `http://localhost:3001` and automatically create the database tables.

### 4. Frontend Setup

Open a new terminal window and navigate to the frontend folder:

```bash
cd front-end
```

**Install dependencies:**

```bash
npm install
```

**Start the frontend server:**

```bash
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## Available Scripts

### Backend (`/back-end`)

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run clean` - Clean build files

### Frontend (`/front-end`)

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## API Endpoints

The backend provides the following main endpoints:

- **Contact API**: `http://localhost:3001/api/contact`

  - `POST /api/contact` - Submit contact form
  - `GET /api/contact` - Get all contacts

- **Quote API**: `http://localhost:3001/api/quote`
  - `POST /api/quote` - Submit quote request

## 🛠️ Features

- **Modern Stack**: React 18 + TypeScript + Node.js + PostgreSQL
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Radix UI components with custom styling
- **Form Handling**: React Hook Form with validation
- **API Integration**: RESTful API with TypeORM
- **Database**: PostgreSQL with automatic migrations
- **Maps Integration**: Mapbox for location services

## Environment Variables

### Backend (.env)

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=shahen_user
DB_PASSWORD=your_password
DB_NAME=shahen_logistics
```

### Frontend (.env)

```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

## Troubleshooting

### Common Issues

1. **Backend won't start**

   - Check if PostgreSQL is running
   - Verify database credentials in `.env`
   - Make sure the database `shahen_logistics` exists

2. **Frontend can't connect to backend**

   - Ensure backend is running on port 3001
   - Check `REACT_APP_API_BASE_URL` in frontend `.env`
   - Verify CORS settings in backend

3. **Database connection errors**
   - Confirm PostgreSQL service is running
   - Check database user permissions
   - Verify connection details in backend `.env`

### Port Issues

If you need to change the default ports:

- **Backend**: Change `PORT` in `back-end/.env`
- **Frontend**: Set `PORT=3001` in `front-end/.env` (or any available port)

## 📱 Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development
2. **Database Changes**: The backend automatically syncs database schema in development mode
3. **API Testing**: Use tools like Postman or curl to test API endpoints
4. **Browser DevTools**: React DevTools extension is helpful for debugging
