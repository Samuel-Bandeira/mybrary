if(process.env.NODE_ENV !== 'production') 
    require('dotenv').config();

const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000;

const indexRoute = require('./routes/index');
const authorRoute = require('./routes/author');
const bookRoute = require('./routes/book');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {
    console.log('connected to mongo');
})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/', indexRoute);
app.use('/authors', authorRoute);
app.use('/books', bookRoute);

app.listen(PORT, () => {
    console.log(`connected on port ${PORT}`);
});