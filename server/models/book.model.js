const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  productId: { type: String, required: true, unique: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;