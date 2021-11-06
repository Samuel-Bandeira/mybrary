const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', (req, res) => {
    res.render('./author/index');
})

router.get('/new', (req, res) => {
    res.render('./author/new', {author: new Author()});
})

router.post('/', (req, res) => {
    const {name} = req.body;
    console.log(name);
})

module.exports = router;