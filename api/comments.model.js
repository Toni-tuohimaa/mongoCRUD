const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Comments
let Comments = new Schema({
  user_name: {
    type: String
  },
  comment: {
    type: String
  },
},{
    collection: 'comments'
});

module.exports = mongoose.model('Comments', Comments);