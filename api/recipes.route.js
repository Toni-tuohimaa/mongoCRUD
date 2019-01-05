const express = require('express');
const recipesRoutes = express.Router();

// Require Comments model in our routes module
let Recipes = require('./recipes.model');

// Defined store route
recipesRoutes.route('/add').post(function (req, res) {
  let recipes = new Recipes(req.body);
  recipes.save()
    .then(recipes => {
      res.status(200).json({'recipes': 'recipe added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
recipesRoutes.route('/').get(function (req, res) {
    Recipes.find(function(err, recipes){
    if(err){
      console.log(err);
    }
    else {
      res.json(recipes);
    }
  });
});

// Defined edit route
recipesRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Recipes.findById(id, function (err, recipes){
      res.json(recipes);
  });
});

//  Defined update route
recipesRoutes.route('/update/:id').post(function (req, res) {
    Recipes.findById(req.params.id, function(err, recipes) {
    if (!recipes)
      res.status(404).send("data is not found");
    else {
        recipes.user_name = req.body.user_name;
        recipes.comment = req.body.comment;

        recipes.save().then(recipes => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
recipesRoutes.route('/delete/:id').get(function (req, res) {
    Recipes.findByIdAndRemove({_id: req.params.id}, function(err, recipes){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = recipesRoutes;