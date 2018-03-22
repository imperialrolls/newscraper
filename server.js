/*jshint esversion: 6 */
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Our scraping tools
var axios = require('axios');
var cheerio = require('cheerio');

// Require all models
var db = require('./models');

var port = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger('dev'));

// Require and use routes modules
const index = require('./routes/index');
const scrape = require('./routes/scrape');
const article = require('./routes/articles');
const notes = require('./routes/notes');

app.use('/', index);
app.use('/scrape', scrape);
app.use('/articles', article);
app.use('/notes', notes);

// Use body-parser for handling form submissions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// Set mongoose database connection
const databaseUri = 'mongodb://localhost/newScraper';

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
}

// Start the server
app.listen(port, function () {
  console.log('App running on port ' + port + '!');
});
