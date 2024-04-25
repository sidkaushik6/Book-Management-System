require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors()); // This line requires the 'cors' module

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/book-management-system";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
