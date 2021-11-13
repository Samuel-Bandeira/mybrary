const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');

router.get('/', async (req, res) => {
    
});

router.get('/new', async (req, res) => {
    try {
        const authors = await Author.find({});
        const book = new Book();
        res.render('./books/new', {
            authors: authors,
            book: book,
        });
    } catch {
        res.redirect('/books');
    }
});

router.post('/', (req, res) => {

});

module.exports = router;