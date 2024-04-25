const Book = require('../models/book.model');

exports.createBook = async (req, res) => {
  try {
    const { title, author, publicationYear, productId } = req.body;
    const newBook = new Book({ title, author, publicationYear, productId });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.remove();
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.query;
    const books = await Book.find({ author });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooksByPublicationYear = async (req, res) => {
  try {
    const { publicationYear } = req.query;
    const books = await Book.find({ publicationYear });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};