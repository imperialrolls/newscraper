/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const db = require('../models');

// POST route to save a note
router.post('/', (req, res, next) => {
  const note = {
    id: req.body.id,
    title: req.body.title,
    body: req.body.body,
  };

  //Save note into mongoDB collection
  db.Note.create(note)
    .then(dbNote => {
      return db.Collection.findOneAndUpdate(
        { _id: note.id },
        { $push: { note: dbNote._id } },
        { new: true }
      );
    })
    .then(dbCollection => {
      res.json(dbCollection);
    })
    .catch(err => {
      //If an error occurred, send it to the client
      res.json(err);
    });
  res.send('Note created');
});

// Export router
module.exports = router;
