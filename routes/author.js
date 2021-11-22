const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', async (req, res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name != "") {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('./authors/index', {
            authors: authors,
            searchOptions: req.query,
        });
    } catch {
        res.redirect('/');
    } 
});

router.get('/new', (req, res) => {
    res.render('./authors/new', {
        author: new Author()
    });
});

router.get('/:id', async(req, res) => {
    res.send(`author id: ${req.params.id}`);    
});

router.get('/:id/edit', async(req, res) => {
    const author = await Author.findById(req.params.id);
    try {
        res.render('./authors/edit', {
            author: author,
        });
    } catch {
        res.redirect('/authors');
    }    
});

router.put('/:id', async(req, res) => {
    const author = await Author.findById(req.params.id);
    try {
        author.name = req.body.name;
        await author.save();
        res.redirect(`/authors/${author._id}`);
    } catch {
        if(author == null) {
            res.redirect('/authors');
        } else {
            res.render(`./authors/edit`, {
                errorMessage: 'Error Updating Author',
                author: author,
            })
        }
    }
});

router.delete('/:id', async(req, res) => {
    res.send(`delete author of id: ${req.params.id}`)
});

router.post('/', async (req, res) => {
    const newAuthor = new Author({
        name: req.body.name,
    });
    try {
        const newAuthor = await newAuthor.save();
        //res.redirect(`./authors/${newAut._id}`);
        res.redirect('./authors');
    } catch {
        res.render('./authors/new', {
            author: newAuthor, 
            errorMessage: 'Error creating author',
        });
    }
});

module.exports = router;