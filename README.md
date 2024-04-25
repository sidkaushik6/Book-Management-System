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

## Data Normalization

The API enforces data normalization for the author field in book entries. Before saving a new book or querying books by author, the author name is normalized by:

- Trimming leading and trailing spaces
- Converting to lowercase
- Replacing consecutive spaces with an underscore (`_`)

For example, if the author name is provided as `"J. K. Rowling"`, it will be normalized and saved as `"j._k._rowling"` in the database.

## Input Validations

The API implements the following input validations:

### User Registration

- **Password**: Must be between 5 and 11 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
- **Email**: Must be a valid email address and should not contain spaces.
- **Username**: Should be alphanumeric, should not contain spaces, and must be between 3 and 20 characters long.

### Book Creation and Update

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

### Books

- `POST /api/books`: Create a new book
- Request headers:
 ```
 Authorization: Bearer <jwt_token>
 ```
- Request body:
 ```json
 {
   "title": "Book Title",
   "author": "John Doe",
   "publicationYear": 2022,
   "productId": "book123"
 }
 ```
- Response:
 - `201 Created` with the created book object
 - `400 Bad Request` if validation fails or unauthorized

- `GET /api/books`: Get all books
- Request headers:
 ```
 Authorization: Bearer <jwt_token>
 ```
- Response:
 - `200 OK` with an array of book objects
 - `401 Unauthorized` if invalid or missing token

- `GET /api/books/:productId`: Get a book by product ID
- Request headers:
 ```
 Authorization: Bearer <jwt_token>
 ```
- Response:
 - `200 OK` with the book object
 - `404 Not Found` if the book is not found
 - `401 Unauthorized` if invalid or missing token

- `PUT /api/books/:productId`: Update a book by product ID
- Request headers:
 ```
 Authorization: Bearer <jwt_token>
 ```
- Request body:
 ```json
 {
   "title": "Updated Book Title",
   "author": "Jane Doe",
   "publicationYear": 2023
 }
 ```
- Response:
 - `200 OK` with the updated book object
 - `404 Not Found` if the book is not found
 - `401 Unauthorized` if invalid or missing token
 - `400 Bad Request` if validation fails

- `DELETE /api/books/:productId`: Delete a book by product ID
- Request headers:
 ```
 Authorization: Bearer <jwt_token>
 ```
- Response:
 - `200 OK` with a success message
 - `404 Not Found` if the book is not found
 - `401 Unauthorized` if invalid or missing token

- `GET /api/books/author/:author`: Get books by author
- Request headers:
 ```
 Authorization: Bearer <jwt_token>
 ```
- Response:
 - `200 OK` with an array of book objects
 - `401 Unauthorized` if invalid or missing token

- `GET /api/books/year/:publicationYear`: Get books by publication year
- Request headers:
 ```
 Authorization: Bearer <jwt_token>
 ```
- Response:
 - `200 OK` with an array of book objects
 - `401 Unauthorized` if invalid or missing token

## Error Handling

The API returns appropriate error messages and HTTP status codes for different error scenarios, such as:

- `400 Bad Request`: Validation errors or missing required fields
- `401 Unauthorized`: Invalid or missing authentication token
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make the necessary changes and commit them
4. Push your changes to your forked repository
5. Submit a pull request to the main repository

## License

This project is licensed under the [MIT License](LICENSE).
