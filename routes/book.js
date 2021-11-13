const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', (req, res) => {
    res.send('all books');
});

router.get('/new', (req, res) => {
    res.send('add book');

});

router.post('/', (req, res) => {

});

module.exports = router;