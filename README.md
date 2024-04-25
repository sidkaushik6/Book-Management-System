# Book Management System

This is a simple book management API built with Node.js, Express.js, and MongoDB. The API provides endpoints for user authentication, CRUD operations for managing books, and filtering books by author or publication year.

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (locally installed or a remote connection string)

## Setup

1. Clone the repository:

```bash
 git clone https://github.com/sidkaushik6/Book-Management-System.git 
 ```

2. Install dependencies:

``` bash
 cd server  
npm install 
```

3. Create a `.env` file in the root directory and add the following environment variables:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:

```bash
npm start
```

The server will start running on `http://localhost:5000`.

## Input Validations

The API implements the following input validations:

### User Registration

- **Password**: Must be between 5 and 11 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
- **Email**: Must be a valid email address and should not contain spaces.
- **Username**: Should be alphanumeric, should not contain spaces, and must be between 3 and 20 characters long.

### Book Creation

- **Title**: Must be between 1 and 50 characters long.
- **Author**: Must be between 1 and 50 characters long.
- **Publication Year**: Must be a valid year and not in the future.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- Request body:
 ```json
 {
   "name": "John Doe",
   "username": "johndoe",
   "email": "johndoe@example.com",
   "password": "Password123!"
 }
 ```
- Response:
 - `201 Created` on successful registration
 - `400 Bad Request` if validation fails or user already exists

- `POST /api/auth/login`: User login
- Request body:
 ```json
 {
   "email": "johndoe@example.com",
   "password": "Password123!"
 }
 ```
- Response:
 - `200 OK` with JSON Web Token on successful login
 - `400 Bad Request` if invalid credentials

