/*jshint esversion: 6 */

// Require dependencies
const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Create a new CollectionSchema object
const CollectionSchema = new Schema({
  // 'title' must be unique and of type String
  title: {
    type: String,
    unique: true,
  },

  // 'link' must be unique and of type String
  link: {
    type: String,
    unique: true,
  },

  // 'notes' is objects that stores a Note id
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
  },
});

// Create Collection model using the schema and mongoose's model method
const Collection = mongoose.model('Collection', CollectionSchema);

// Export the Collection model
module.exports = Collection;
