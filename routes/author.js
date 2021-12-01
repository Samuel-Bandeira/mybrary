const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
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
    try {
        const author = await Author.findById(req.params.id);
        const books = await Book.find({ author: author.id }).limit(6).exec();
        res.render('./authors/show', {
            author: author,
            books: books,
        });
    } catch(err){
        console.log(err);
        res.redirect('/');
    }
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

router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name,
    });
    try {
        const newAuthor = await author.save();
        //res.redirect(`./authors/${newAut._id}`);
        res.redirect('./authors');
    } catch(err) {
        res.render('./authors/new', {
            author: newAuthor, 
            errorMessage: err.message,
        });
    }
});

router.put('/:id', async(req, res) => {
    const author = await Author.findById(req.params.id);
    try {
        author.name = req.body.name;
        await author.save();
        //res.redirect(`/authors/${author._id}`);
        res.redirect('/authors');
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
    const author = await Author.findById(req.params.id);
    try {
        await author.remove();
        res.redirect('/authors');
    } catch {
        if(author == null) {
            res.redirect('/');
        } else {
            res.redirect(`/authors/${author._id}`);
        }
    }
});



module.exports = router;