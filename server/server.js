require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const authRoutes = require('./routes/auth.routes');


const verifyToken = require('./middleware/auth.middleware');

const app = express();
const server = http.createServer(app);


// Middleware
app.use(express.json());
app.use(cors()); // This line requires the 'cors' module

// MongoDB connection
mongoose.connect('mongodb://localhost/book-management-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
app.use('/api/auth', authRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});