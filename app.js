'use strict';

var express = require('express');
var app = express();

var populationRouter = require('./src/routes/populationRoutes');
var authorRouter = require('./src/routes/authorRoutes');
var seedPopulationsRouter = require('./src/routes/populationSeedRoutes');
var seedAuthorsRouter = require('./src/routes/authorsSeedRoutes');


var port = process.env.PORT || 5000;


//used by express first
app.use(express.static('./public'));
app.use(express.static('./src'));
app.use(express.static('./sampledata'));



//templating engine
app.set('views', './src/views');      
app.set('view engine', 'ejs');


app.use('/population', populationRouter.getPopulations());
app.use('/authors', authorRouter.getAuthors());
app.use('/seedpopulation', seedPopulationsRouter.seedPopulations());
app.use('/seedauthors', seedAuthorsRouter.seedAuthors());

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Population Chart'
    });
});

app.get('/books', function (req, res) {
    res.render('authors', {
        title: 'authors Chart'
    });
});

app.listen(port, function () {
    console.log('running server on port ' + port) 
});
