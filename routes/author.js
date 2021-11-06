const express = require('express');
const author = require('../models/author');
const router = express.Router();
const Author = require('../models/author');

router.get('/', (req, res) => {
    res.render('./authors/index');
})

router.get('/new', (req, res) => {
    res.render('./authors/new', {author: new Author()});
})

router.post('/', async (req, res) => {
    const newAuthor = new Author({
        name: req.body.name,
    });
    try {
        const newAuthor = await author.save();
    } catch(error) {

    }
    newAuthor.save((err, newAut) => {
        if(err) {
            res.render('./authors/new', {
                author: newAuthor, 
                errorMessage: 'Error creating author',
            });
        } else {
            //res.redirect(`./authors/${newAut._id}`);
            res.redirect('./authors');
        }
    })
});

module.exports = router;