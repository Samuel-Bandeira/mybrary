const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const Book = require('../models/book');
const Author = require('../models/author');

const uploadPath = path.join('public', Book.coverImageBasePath);

const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif'];
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});

router.get('/', async (req, res) => {
    res.send('All Books');
});

router.get('/new', async (req, res) => {
    renderNewPage(res, new Book());
});

router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null;

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description,
        coverImageName: fileName, 
    });

    try {
        const newBook = await book.save();
        //res.redirect(`/books/${newBook._id}`);
        res.redirect('/books'); 
    } catch {
        renderNewPage(res, book, true);
    }
});

const renderNewPage = async (res, book, hasError = false) => {
    try {
        const authors = await Author.find({});
        const params = {
            authors: authors,
            book: book,
        }
        if(hasError) params.errorMessage = 'Error Creating Book';

        res.render('./books/new', params);
    } catch {
        res.redirect('/books');
    }
}

module.exports = router;