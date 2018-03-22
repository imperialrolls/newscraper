/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

//Require models
const db = require('../models');

//GET route to bring articles from database to the homepage
router.get('/', (req, res, next) => {
  //Grab all articles from database
  db.Article.find({})
    .then(dbArticle => {
      //Send articles data to be rendered
      res.render('home', { articles: dbArticle });
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//Export router
module.exports = router;
