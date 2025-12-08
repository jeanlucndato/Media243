# Media243 Backend - API Documentation

## Overview
Media243 backend API for managing streaming content, users, and administration.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your settings:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `ADMIN_SECRET_KEY`: Secret key for admin registration

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3001`

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/signup
Body: { name, email, password }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Returns: { success, token, user }
```

#### Verify Token
```
GET /api/auth/verify-token
Headers: Authorization: Bearer {token}
```

#### Register Admin
```
POST /api/auth/admin/signup
Body: { name, email, password, adminSecretKey }
```

### Movie Routes (`/api/movies`)

#### Get All Movies (Public)
```
GET /api/movies
Query: ?genre=action&search=term
```

#### Get Single Movie
```
GET /api/movies/:id
```

### Category Routes (`/api/categories`)

#### Get All Categories
```
GET /api/categories
```

### Admin Routes (`/api/admin`)
**All admin routes require authentication and admin role**

#### Get Statistics
```
GET /api/admin/stats
Headers: Authorization: Bearer {token}
```

#### User Management
```
GET /api/admin/users?page=1&limit=20
GET /api/admin/users/:id
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
```

#### Movie Management
```
GET /api/admin/movies?page=1&limit=20
POST /api/admin/movies
PUT /api/admin/movies/:id
DELETE /api/admin/movies/:id
```

#### Category Management
```
GET /api/admin/categories
POST /api/admin/categories
PUT /api/admin/categories/:id
DELETE /api/admin/categories/:id
```

## Admin Access

### Creating First Admin

Use the admin registration endpoint with your secret key:

```bash
curl -X POST http://localhost:3001/api/auth/admin/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@media243.com",
    "password": "securepassword",
    "adminSecretKey": "your-admin-registration-secret-key"
  }'
```

Or use Postman/Insomnia with the same request.

### Accessing Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Login with admin credentials
3. Access admin dashboard at `/admin/dashboard`

## Database Models

### User
- name: String
- email: String (unique)
- password: String (hashed)
- isAdmin: Boolean
- isActive: Boolean
- lastLogin: Date

### Movie
- title: String
- description: String
- genre: String
- rating: String
- year: String
- duration: String
- posterUrl: String
- backdropUrl: String
- videoUrl: String
- trailerUrl: String
- tags: [String]
- views: Number
- isActive: Boolean

### Category
- name: String (unique)
- slug: String (unique)
- description: String
- icon: String
- order: Number
- isActive: Boolean

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Security Notes

1. Change `JWT_SECRET` and `ADMIN_SECRET_KEY` in production
2. Use HTTPS in production
3. Keep `ADMIN_SECRET_KEY` private and secure
4. Regularly rotate JWT secrets
5. Implement rate limiting for production

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd backend
vercel
```

3. Add environment variables in Vercel dashboard

### Environment Variables for Production

- `MONGODB_URI`: Production MongoDB Atlas URI
- `JWT_SECRET`: Strong random secret
- `ADMIN_SECRET_KEY`: Strong random secret
- `NODE_ENV`: production

## Support

For issues or questions, refer to the main project documentation.
