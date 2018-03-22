/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

//Require models
const db = require('../models');

//POST route
router.post('/', (req, res, next) => {
  const article = {
    title: req.body.title,
    link: req.body.link,
  };

  //Save article into mongoDB collection
  db.Collection.create(article)
    .then(dbCollection => {
      console.log(dbCollection);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
  res.send('Collection created');
});

// GET route to find all saved articles in the collections
router.get('/', (req, res, next) => {
  // Grab articles from collections
  db.Collection.find({})
    .then(dbCollection => {
      // Send collections data to be rendered
      res.render('home', { articles: dbCollection, saved: true });
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//DELETE route to delete selected article from the collection
router.delete('/', (req, res, next) => {
  // Delete article from the collection
  db.Collection.remove({ _id: req.body.id })
    .then(dbCollection => {
      res.json(dbCollection);
    })
    .catch(err => {
      res.json(err);
    });
  console.log(`Article with id: ${req.body.id} deleted!`);
});

//GET route to populate all saved notes
router.get('/', (req, res, next) => {
  //Grab notes from notes
  db.Collection.findOne({ _id: req.body.id })
    .populate('note')
    .then(dbCollection => {
      res.send(dbCollection);
    })
    .catch(err => {
      //If an error occurred, send it to the client
      res.json(err);
    });
});

//Export router
module.exports = router;
