const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const path = require('path');
const uploadPath = path.Join('public', Book.coverImageBasePath);
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif'];
const multer = require('multer');
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});

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
        res.redirect('/books');
    } catch {
        res.redirect('/books/new')
    }
});

module.exports = router;