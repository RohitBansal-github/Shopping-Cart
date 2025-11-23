# Shopping Cart Application

A full-stack e-commerce shopping cart application with Go backend and React frontend, using Supabase PostgreSQL database.

## Features

- User authentication with token-based sessions
- Item browsing and cart management
- Single cart per user
- Order creation from cart
- Order history tracking

## Tech Stack

**Backend:**
- Go (Golang)
- Gin Web Framework
- GORM ORM
- PostgreSQL (Supabase)

**Frontend:**
- React
- Fetch API for HTTP requests

## Prerequisites

- Go 1.24+ installed
- Node.js and npm installed
- Supabase account with PostgreSQL database
- Git

## Project Structure

```
.
├── backend/
│   ├── config/          # Database configuration
│   ├── handlers/        # API route handlers
│   ├── middleware/      # Auth middleware
│   ├── models/          # Database models
│   ├── main.go          # Application entry point
│   ├── .env             # Environment variables
│   └── go.mod           # Go dependencies
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service layer
│   │   └── App.js       # Main app component
│   └── package.json     # Node dependencies
└── database_schema.sql  # Database schema
```

## Setup Instructions

### 1. Database Setup

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `database_schema.sql` to create the tables
4. Note your database credentials from Supabase settings

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Update the `.env` file with your Supabase credentials:
   ```
   DB_HOST=<your-supabase-host>
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=<your-database-password>

# Server Port
    PORT=8080

   ```

3. Install dependencies:
   ```bash
   go mod download
   ```

4. Run the backend server:
   ```bash
   go run main.go
   ```

   The server will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## API Endpoints

### User Endpoints
- `POST /users` - Create a new user
- `GET /users` - List all users
- `POST /users/login` - Login (returns token)

### Item Endpoints
- `POST /items` - Create an item
- `GET /items` - List all items

### Cart Endpoints (Requires Authentication)
- `POST /carts` - Add items to cart
- `GET /carts` - List all carts

### Order Endpoints (Requires Authentication)
- `POST /orders` - Create order from cart
- `GET /orders` - List all orders

## Authentication

Protected endpoints require an `Authorization` header with the user's token:

```
Authorization: <token>
```

## Database Schema

### Users
- `id` (Primary Key)
- `username` (Unique)
- `password` (Hashed)
- `token`
- `cart_id` (Foreign Key)
- `created_at`

### Items
- `id` (Primary Key)
- `name`
- `status`
- `created_at`

### Carts
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `name`
- `status`
- `created_at`

### Cart Items
- `cart_id` (Primary Key, Foreign Key)
- `item_id` (Primary Key, Foreign Key)

### Orders
- `id` (Primary Key)
- `cart_id` (Foreign Key)
- `user_id` (Foreign Key)
- `created_at`

## Usage Flow

1. **Create a User**: Use POST /users to create an account
2. **Login**: Use the login screen or POST /users/login to get a token
3. **Browse Items**: View all available items on the main screen
4. **Add to Cart**: Click on items to add them to your cart
5. **View Cart**: Click the "Cart" button to see items in your cart
6. **Checkout**: Click "Checkout" to convert your cart into an order
7. **View Orders**: Click "Order History" to see your past orders

## Testing with Postman

A Postman collection is recommended for testing. Sample requests:

### Create User
```json
POST http://localhost:8080/users
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

### Login
```json
POST http://localhost:8080/users/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

### Add to Cart
```json
POST http://localhost:8080/carts
Authorization: <your-token>
Content-Type: application/json

{
  "item_ids": [1, 2, 3]
}
```

### Create Order
```json
POST http://localhost:8080/orders
Authorization: <your-token>
Content-Type: application/json

{
  "cart_id": 1
}
```

## Development Notes

- CORS is enabled for all origins in development
- Passwords are hashed using bcrypt
- Each user can only have one active cart at a time
- Tokens are randomly generated 64-character hex strings
- Cart status changes to "ordered" after checkout

## Troubleshooting

**Backend won't start:**
- Check that your Supabase credentials are correct
- Ensure PostgreSQL database is accessible
- Verify port 8080 is not in use

**Frontend can't connect to backend:**
- Ensure backend is running on port 8080
- Check CORS settings
- Verify API_URL in frontend services

**Database connection issues:**
- Verify Supabase database is running
- Check firewall/network settings
- Ensure SSL mode is set to "require" for Supabase

## License

This project is for educational purposes.
