'use strict';

var express = require('express');
var app = express();

var populationRouter = require('./src/routes/populationRoutes');
var authorRouter = require('./src/routes/authorRoutes');

var port = process.env.PORT || 5000;


//used by express first
app.use(express.static('./public'));
app.use(express.static('./src'));
app.use(express.static('./sampledata'));



//templating engine
app.set('views', './src/views');      
app.set('view engine', 'ejs');


app.use('/population', populationRouter.getPopulations());
app.use('/booksdata', authorRouter.getAuthors());
app.use('/authors', authorRouter.getAuthors());

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Population Chart'
    });
});

app.get('/books', function (req, res) {
    res.render('books', {
        title: 'authors Chart'
    });
});

app.get('/tsv', function (req, res) {

    res.render('authors', {
        title: 'authors Chart'
    });
});

app.get('/linechart', function (req, res) {

    res.render('linechart', {
        title: 'authors Chart'
    });
})

app.listen(port, function () {
    console.log('running server on port ' + port) 
});
