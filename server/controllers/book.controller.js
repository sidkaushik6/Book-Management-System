const Book = require("../models/book.model");
const {
  validateTitle,
  validateAuthor,
  validatePublicationYear,
  normalizeAuthor,
  normalizeTitle,
} = require("../utils/validations");
const { validationResult } = require("express-validator");

exports.createBook = [
  validateTitle,
  validateAuthor,
  validatePublicationYear,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, author, publicationYear, productId } = req.body;
      const normalizedAuthor = normalizeAuthor(author);
      const normalizedTitle = normalizeTitle(title);

      const newBook = new Book({
        title: normalizedTitle,
        author: normalizedAuthor,
        publicationYear,
        productId,
      });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
];

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//READ, UPDATE, DELETE by ProductID

exports.getBookByProductId = async (req, res) => {
  try {
    const book = await Book.findOne({ productId: req.params.productId });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookByProductId = async (req, res) => {
  try {
    const book = await Book.findOne({ productId: req.params.productId });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBookByProductId = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      productId: req.params.productId,
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Filtering Based on Author and Publication Year

exports.getBooksByAuthor = async (req, res) => {
  try {
    const author = normalizeAuthor(req.params.author);
    const books = await Book.find({ author });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooksByPublicationYear = async (req, res) => {
  try {
    const publicationYear = parseInt(req.params.publicationYear);
    const books = await Book.find({ publicationYear });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
