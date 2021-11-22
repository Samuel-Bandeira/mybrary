const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', async(req, res) => { 
    let query = Book.find()
    query = query.sort({ createdAt: 'desc'}).limit(2);
    try {
        books = await query.exec();
        res.render('./index', {
            books: books,
        });
    } catch {
        res.redirect('/');
    }
    
});

module.exports = router;