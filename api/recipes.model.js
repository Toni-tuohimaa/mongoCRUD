const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Recipes
let Recipes = new Schema({
  recipe_name: {
    type: String
  },
  ingredients: {
    type: String
  },
  method: {
    type: Object
  },
},{
    collection: 'recipes'
});

module.exports = mongoose.model('Recipes', Recipes);