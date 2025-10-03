# Shahen Logistics Backend - PostgreSQL Integration

This backend application uses **TypeORM** with **PostgreSQL** for robust data management. TypeORM provides excellent TypeScript support, advanced querying capabilities, and a powerful migration system.

## 🗄️ Database Setup

### Prerequisites

1. **PostgreSQL Installation**

   - Install PostgreSQL 12+ from [postgresql.org](https://www.postgresql.org/download/)
   - Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres`

2. **Create Database**
   ```sql
   CREATE DATABASE shahen_logistics;
   CREATE USER shahen_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE shahen_logistics TO shahen_user;
   ```

### Environment Configuration

1. **Copy Environment File**

   ```bash
   cp .env.example .env
   ```

2. **Update Database Configuration in .env**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=shahen_user
   DB_PASSWORD=your_secure_password
   DB_NAME=shahen_logistics
   ```

### Database Initialization

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Migrations (Auto-sync in development)**

   ```bash
   npm run dev
   ```

   The application will automatically create tables in development mode.

3. **Seed Initial Data**
   ```bash
   npm run db:seed
   ```

## 📊 Database Schema

### Core Tables

#### `contacts`

- **Purpose**: Store customer contact form submissions
- **Key Features**: Status tracking, IP logging, admin notes
- **Indexes**: email, status, createdAt

#### `users`

- **Purpose**: User accounts (customers, drivers, admins)
- **Key Features**: Role-based access, profile information
- **Indexes**: email (unique), phone (unique), role, status

#### `truck_types`

- **Purpose**: Available truck configurations
- **Key Features**: Specifications, pricing, features
- **Indexes**: name (unique), category, isActive

#### `orders`

- **Purpose**: Transportation orders
- **Key Features**: Full pickup/delivery info, cargo details, pricing
- **Relationships**: customer → users, driver → users, truckType → truck_types
- **Indexes**: status, customerId, driverId, dates

## 🚀 API Endpoints

### Contact Management

| Method | Endpoint                     | Description              |
| ------ | ---------------------------- | ------------------------ |
| POST   | `/api/contact`               | Submit contact form      |
| GET    | `/api/contact`               | Get all contacts (admin) |
| GET    | `/api/contact/search?q=term` | Search contacts          |
| GET    | `/api/contact/stats`         | Contact statistics       |
| GET    | `/api/contact/:id`           | Get specific contact     |
| PUT    | `/api/contact/:id/status`    | Update contact status    |
| DELETE | `/api/contact/:id`           | Delete contact           |

### Query Parameters

- **Pagination**: `limit`, `offset`
- **Filtering**: `status` (pending, processed, replied)
- **Sorting**: `sortBy`, `sortOrder` (ASC/DESC)

## 📈 Advanced Features

### 1. Data Validation

```typescript
// Entity-level validation with class-validator
@Column({ type: "varchar", length: 255 })
@IsEmail({}, { message: "Please provide a valid email address" })
email: string;
```

### 2. Repository Pattern

```typescript
// Clean data access layer
const result = await contactRepository.findAll({
	status: ContactStatus.PENDING,
	limit: 10,
	sortBy: "createdAt",
	sortOrder: "DESC",
});
```

### 3. Full-Text Search

```typescript
// Search across multiple fields
const contacts = await contactRepository.searchContacts("john doe");
```

### 4. Statistics Dashboard

```typescript
// Real-time statistics
const stats = await contactService.getContactStats();
// Returns: { total, pending, processed, replied, todayCount }
```

## 🔧 Development Commands

```bash
# Start development server with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database operations
npm run db:seed        # Populate initial data
npm run db:setup       # Full setup (migrate + seed)

# TypeORM CLI (future migrations)
npm run typeorm migration:generate -- src/migrations/NewMigration
npm run typeorm migration:run
```

## 🛡️ Security Features

1. **Input Validation**: Class-validator decorators on all entities
2. **SQL Injection Protection**: TypeORM parameterized queries
3. **Data Sanitization**: Built-in TypeORM escaping
4. **IP Tracking**: Client IP logging for contact submissions
5. **User Agent Logging**: Browser/client identification

## 📝 Entity Relationships

```
Users (1) ──── (N) Orders
  │
  └──── (1) Customer
  └──── (1) Driver (optional)

TruckTypes (1) ──── (N) Orders

Contacts (independent entity)
```

## 🎯 Future Enhancements

1. **Authentication System** with JWT
2. **Real-time Order Tracking** with WebSockets
3. **Email Notifications** for contact forms
4. **File Upload** for order documents
5. **Geolocation Services** for route optimization
6. **Payment Integration** for order processing
7. **Multi-language Support** for international users

## 🔍 Monitoring & Logging

- **Database Connections**: Automatic retry and connection pooling
- **Query Logging**: Enabled in development mode
- **Error Tracking**: Comprehensive error handling and logging
- **Performance Metrics**: Query execution time monitoring

## 🚨 Troubleshooting

### Common Issues

1. **Connection Refused**

   - Verify PostgreSQL is running
   - Check connection credentials in .env
   - Ensure database exists

2. **Migration Errors**

   - Drop tables manually if needed
   - Verify user permissions
   - Check for existing data conflicts

3. **Validation Errors**
   - Check entity decorators
   - Verify required fields
   - Review class-validator constraints

### Database Reset (Development Only)

```sql
-- WARNING: This will delete all data
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

## 📚 Additional Resources

- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Class Validator](https://github.com/typestack/class-validator)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
