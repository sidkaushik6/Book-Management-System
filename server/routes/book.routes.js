const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const verifyToken = require('../middleware/auth.middleware');

router.post('/', verifyToken, bookController.createBook);
router.get('/', verifyToken, bookController.getAllBooks);
router.get('/:productId', verifyToken, bookController.getBookByProductId);
router.put('/:productId', verifyToken, bookController.updateBookByProductId);
router.delete('/:productId', verifyToken, bookController.deleteBookByProductId);
router.get('/author/:author', verifyToken, bookController.getBooksByAuthor);
router.get('/year/:publicationYear', verifyToken, bookController.getBooksByPublicationYear);

module.exports = router;