# Quick Start Guide

## 1. Database Setup (Supabase)

1. Go to your Supabase dashboard
2. Open SQL Editor
3. Copy and paste the contents of `database_schema.sql`
4. Run the query
5. Note: Sample items will be automatically inserted

## 2. Backend Setup

```bash
cd backend
go mod download
go run main.go
```

Server will run on: `http://localhost:8080`

## 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

App will open on: `http://localhost:3000`

## 4. Test the Application

### Option 1: Use the Web UI

1. Open `http://localhost:3000`
2. Login with credentials (create user first via API)
3. Click items to add to cart
4. Click "Cart" to view cart items
5. Click "Checkout" to create order
6. Click "Order History" to view orders

### Option 2: Use Postman

1. Import `Shopping_Cart_API.postman_collection.json` into Postman
2. Create a user: POST /users
3. Login: POST /users/login (save the token)
4. Set {{token}} variable in Postman with your token
5. Test other endpoints

## Sample Test Flow

### Step 1: Create User via Postman
```bash
POST http://localhost:8080/users
Content-Type: application/json

{
  "username": "john",
  "password": "john123"
}
```

### Step 2: Login via Web UI
- Open http://localhost:3000
- Username: john
- Password: john123

### Step 3: Shop!
- Click on items to add to cart
- View cart to see items
- Checkout to create order
- View order history

## Troubleshooting

**Can't connect to database?**
- Check your `.env` file in backend folder
- Verify Supabase credentials
- Ensure database is running

**Backend won't start?**
- Port 8080 might be in use
- Run: `lsof -i :8080` to check
- Kill the process or change PORT in .env

**Frontend can't reach backend?**
- Ensure backend is running on port 8080
- Check browser console for errors
- Verify CORS is enabled

## Next Steps

- Add more items via POST /items
- Create multiple users for testing
- Test cart and order functionality
- Review the code in each component

Enjoy!
