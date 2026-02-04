# Authorization-based Todo Application

A secure Todo application built using **Node.js**, **Express.js**, **Supabase** and **JWT based authentication**

## Features

- User Signup & Login
- Password hashing with bcrypt
- JWT-based authentication (1 hour expiry)
- Protected TODO routes
- User-specific TODO CRUD operations
- Authorization enforcement (users can only manage their own todos)
- Clean project structure
- Environment-based configuration

## Tech Stack

- Node.js
- Express.js
- Supabase (PostgreSQL)
- JWT (jsonwebtoken)
- bcrypt
- dotenv

## Project Structure

src/
├── config/
│ └── supabase.js
├── middleware/
│ └── auth.middleware.js
├── controllers/
│ ├── auth.controller.js
│ └── todos.controller.js
├── routes/
│ ├── auth.routes.js
│ └── todo.routes.js
├── utils/
│ └── checkDB.js
├── app.js
└── server.js

## Setup Instructions

### 1. Clone the repository

git clone <your-github-repo-url>
cd <project-folder>

### 2. Install dependencies

npm install

### 3. Configure environment variables

- create a .env file using .env.example as a reference

### 4. Start the server

npm start

Server will run at:

http://localhost:3652

## 📄 API Endpoints Documentation

### Authentication Routes

#### 1. Signup User

**POST /auth/signup**

**Request Body**

{
    "name":"Lalitha",
    "email":"lalitha@gmail.com",
    "password":"lally123"
}

**Success Response (201)**

{
    "message": "Signup successful",
    "user": {
        "id": "fb5989f2-7bec-46f3-a524-3939e82598f1",
        "name": "Lalitha",
        "email": "lalitha@gmail.com"
    }
}

### 2. Login User

**POST /auth/login**

**Request Body**

{
    "email":"lalitha@gmail.com",
    "password":"lally123"
}

**Success Response (200)**

{
  "message": "Login successful",
  "userId": "fb5989f2-7bec-46f3-a524-3939e82598f1",
  "email": "lalitha@gmail.com",
  "token": "<jwt_token_here>"
}


### TODO Routes (Protected)

All TODO routes require Authorization header:

**Authorization: Bearer <JWT_TOKEN>**

### 3. Create Todo

**POST /todos**

**Request Body**

{
  "title": "Learn Node.js",
  "completed": false
}

**Success Response (201)**

{
    "message": "Todo created successfully",
    "todo": {
        "id": "3077cb4e-e44b-44c9-b09c-937988cecc1c",
        "title": "Learn Node.js",
        "completed": false,
        "user_id": "fb5989f2-7bec-46f3-a524-3939e82598f1",
        "created_at": "2026-02-04T09:02:50.577708"
    }
}

### 4. Get Todos

**GET /todos**

**Success Response (200)**

{
    "message": "Todos data",
    "todos": [
        {
            "id": "3077cb4e-e44b-44c9-b09c-937988cecc1c",
            "title": "Learn Node.js",
            "completed": false,
            "user_id": "fb5989f2-7bec-46f3-a524-3939e82598f1",
            "created_at": "2026-02-04T09:02:50.577708"
        }
    ]
}

### 5. Update Todo

**PUT /todos/:id**

**Request Body**

{
  "title": "Learn Supabase",
  "completed": true
}

**Success Response (200)**

{
    "message": "Todo updated",
    "todo": [
        {
            "id": "3077cb4e-e44b-44c9-b09c-937988cecc1c",
            "title": "Learn Supabase",
            "completed": true,
            "user_id": "fb5989f2-7bec-46f3-a524-3939e82598f1",
            "created_at": "2026-02-04T09:02:50.577708"
        }
    ]
}

### 6. Delete Todo

**DELETE /todos/:id**

**Success Response (200)**

{
    "message": "Todo deleted successfully"
}

## 🔑 Security Notes

- Passwords are hashed using bcrypt
- JWT tokens are required for all TODO routes
- User ID is derived from JWT (never accepted from client)
- Authorization enforced at query level using `user_id`








