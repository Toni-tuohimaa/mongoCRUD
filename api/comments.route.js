const express = require('express');
const commentsRoutes = express.Router();

// Require Comments model in our routes module
let Comments = require('./comments.model');

// Defined store route
commentsRoutes.route('/add').post(function (req, res) {
  let comments = new Comments(req.body);
  comments.save()
    .then(comments => {
      res.status(200).json({'comments': 'comment added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
commentsRoutes.route('/get_comments').get(function (req, res) {
    Comments.find(function(err, comments){
    if(err){
      console.log(err);
    }
    else {
      res.json(comments);
    }
  });
});

// Defined edit route
commentsRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Comments.findById(id, function (err, comments){
      res.json(comments);
  });
});

//  Defined update route
commentsRoutes.route('/update/:id').post(function (req, res) {
    Comments.findById(req.params.id, function(err, comments) {
    if (!comments)
      res.status(404).send("data is not found");
    else {
        comments.user_name = req.body.user_name;
        comments.comment = req.body.comment;

        comments.save().then(comments => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
commentsRoutes.route('/delete/:id').get(function (req, res) {
    Comments.findByIdAndRemove({_id: req.params.id}, function(err, comments){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = commentsRoutes;